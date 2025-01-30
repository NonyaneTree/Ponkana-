<script>
    let voiceEnabled = true;

    // Toggle voice command on/off
    document.getElementById("toggleVoiceCommand").addEventListener("click", function () {
        voiceEnabled = !voiceEnabled;
        this.textContent = voiceEnabled ? "Turn Off Voice Command" : "Turn On Voice Command";
        if (voiceEnabled) {
            startVoiceCommand();
        } else {
            stopVoiceCommand();
        }
    });

    // Initialize SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    function startVoiceCommand() {
        recognition.start(); // Start listening for speech
        recognition.onresult = function(event) {
            let last = event.results.length - 1;
            let command = event.results[last][0].transcript.toLowerCase();
            
            if (command.includes("hi") || command.includes("hello")) {
                alert("Hello, welcome to Ponkana Funerals! How can I assist you?");
            }
            if (command.includes("contact us")) {
                alert('Contact Us:\nAkasia: 012 701 1216\nMain: 082 645 6133');
            }
            if (command.includes("about the owners")) {
                alert('The funeral parlour was founded by Mr. Ponkana.');
            }
            if (command.includes("policies")) {
                window.location.href = 'policies.html';  // Redirect to policies page
            }
            if (command.includes("open menu")) {
                document.querySelector('.dropdown-content').style.display = 'block'; // Open dropdown menu
            }
            if (command.includes("open robot")) {
                window.location.href = 'robot.html'; // Redirect to robot page
            }

            // Restart voice command to keep listening
            if (voiceEnabled) {
                startVoiceCommand();
            }
        };
    }

    function stopVoiceCommand() {
        recognition.stop(); // Stop the speech recognition
    }

    // Start the voice command automatically when the page loads
    if (voiceEnabled) {
        startVoiceCommand();
    }

    // Event listeners for dropdown items
    document.getElementById('contact-us').addEventListener('click', () => {
        alert('Contact Us:\nAkasia: 012 701 1216\nMain: 082 645 6133');
    });

    document.getElementById('about-owners').addEventListener('click', () => {
        alert('About the Owners:\nThe funeral parlour was founded by Mr. Ponkana.');
    });
</script>
