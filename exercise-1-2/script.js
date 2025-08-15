// Global AudioContext to manage audio playback
let audioContext;
let currentSource; // To keep track of the currently playing audio source

// Helper function to convert base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Helper function to convert PCM audio data to WAV Blob
function pcmToWav(pcm16, sampleRate) {
    const dataLength = pcm16.length * 2; // 2 bytes per sample for PCM16
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // RIFF identifier
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true); // file length - 8
    writeString(view, 8, 'WAVE');
    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // subchunk1size
    view.setUint16(20, 1, true); // audio format (1 = PCM)
    view.setUint16(22, 1, true); // num channels
    view.setUint32(24, sampleRate, true); // sample rate
    view.setUint32(28, sampleRate * 1 * 2, true); // byte rate (sample rate * num channels * bytes per sample)
    view.setUint16(32, 1 * 2, true); // block align (num channels * bytes per sample)
    view.setUint16(34, 16, true); // bits per sample
    // DATA sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true); // subchunk2size

    // Write the PCM data
    let offset = 44;
    for (let i = 0; i < pcm16.length; i++) {
        view.setInt16(offset, pcm16[i], true); // Write signed 16-bit little-endian
        offset += 2;
    }

    return new Blob([view], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}


/**
 * Plays the given text using the Gemini TTS API with a specified voice.
 * @param {string} text - The text phrase to synthesize.
 * @param {string} voiceName - The name of the voice to use (e.g., 'Kore', 'Puck').
 */
async function playPhrase(text, voiceName) {
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const allDialogueLines = document.querySelectorAll('.dialogue-line');

    // Disable all dialogue lines during loading/playback
    allDialogueLines.forEach(line => line.style.pointerEvents = 'none');
    errorMessage.style.display = 'none';
    loadingIndicator.style.display = 'block';

    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Stop any currently playing audio
        if (currentSource) {
            currentSource.stop();
            currentSource.disconnect();
        }

        const payload = {
            contents: [{
                parts: [{ text: text }]
            }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voiceName }
                    }
                }
            },
            model: "gemini-2.5-flash-preview-tts"
        };

        const apiKey = ""; // Canvas will provide this API key automatically at runtime.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

        let response;
        let retryCount = 0;
        const MAX_RETRIES = 3;
        const RETRY_DELAY_MS = 1000; // 1 second

        while (retryCount < MAX_RETRIES) {
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    break; // Success! Exit retry loop
                } else if (response.status === 429 || response.status >= 500) {
                    // Too Many Requests or Server Error - retry
                    retryCount++;
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * Math.pow(2, retryCount - 1)));
                    console.warn(`Retry attempt ${retryCount} for TTS API (status: ${response.status})...`);
                } else {
                    // Other non-retryable errors
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }
            } catch (fetchError) {
                if (retryCount < MAX_RETRIES - 1) {
                    retryCount++;
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * Math.pow(2, retryCount - 1)));
                    console.warn(`Fetch error, retrying (${retryCount}/${MAX_RETRIES}):`, fetchError);
                } else {
                    throw fetchError; // Re-throw if max retries reached
                }
            }
        }

        if (!response || !response.ok) {
            throw new Error('Failed to fetch audio after multiple retries.');
        }

        const result = await response.json();
        const part = result?.candidates?.[0]?.content?.parts?.[0];
        const audioData = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType;

        if (audioData && mimeType && mimeType.startsWith("audio/L16")) {
            // Extract sample rate from mimeType, e.g., "audio/L16;rate=16000"
            const sampleRateMatch = mimeType.match(/rate=(\d+)/);
            const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 16000; // Default to 16kHz

            const pcmData = base64ToArrayBuffer(audioData);
            const pcm16 = new Int16Array(pcmData); // API returns signed PCM16 audio data.

            const wavBlob = pcmToWav(pcm16, sampleRate);
            const audioUrl = URL.createObjectURL(wavBlob);

            const audio = new Audio(audioUrl);
            audio.play();

            // When audio ends, re-enable buttons
            audio.onended = () => {
                allDialogueLines.forEach(line => line.style.pointerEvents = 'auto');
            };

        } else {
            throw new Error("Invalid audio data received from API.");
        }
    } catch (error) {
        console.error("Error playing phrase:", error);
        errorMessage.textContent = "Error: Could not play audio. Please try again later.";
        errorMessage.style.display = 'block';
    } finally {
        loadingIndicator.style.display = 'none';
        // Ensure buttons are re-enabled even if there's an error during playback start
        // (audio.onended handles it for successful playback)
        setTimeout(() => {
            allDialogueLines.forEach(line => line.style.pointerEvents = 'auto');
        }, 500); // Small delay to ensure any audio start logic finishes
    }
}
