let currentStep = 1;
const totalSteps = 9;
const formData = {
    services: [],
    building: null,
    goal: null,
    budget: null,
    timeline: null
};

const progressTexts = [
    "Getting to know you...",
    "Cooking the strategy...",
    "This is where things get serious 👀",
    "Almost there chief...",
    "Final touches...",
    "Making it official...",
    "Just a second...",
    "The vision is clear 🚀",
    "Ready to send!"
];

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    const textIndex = Math.min(Math.floor((currentStep - 1)), progressTexts.length - 1);
    document.getElementById('progressText').innerText = progressTexts[textIndex];
}

function nextStep() {
    const currentElem = document.getElementById(`step-${currentStep}`);
    currentElem.classList.add('exit');
    
    setTimeout(() => {
        currentElem.classList.remove('active', 'exit');
        currentStep++;
        const nextElem = document.getElementById(`step-${currentStep}`);
        if (nextElem) {
            nextElem.classList.add('active');
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Auto-focus first input if exists
            const firstInput = nextElem.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    }, 500);
}

// Special handling for Step 2 (Conversational inputs)
function handleStep2() {
    const name = document.getElementById('name').value;
    const emailGroup = document.getElementById('email-group');
    const phoneGroup = document.getElementById('phone-group');
    const nextBtn = document.getElementById('step-2-next');

    if (!name) return alert("Tell us your name first!");

    if (emailGroup.style.display === 'none') {
        emailGroup.style.display = 'block';
        emailGroup.classList.add('animate-in');
        document.getElementById('email').focus();
        return;
    }

    const email = document.getElementById('email').value;
    if (!email) return alert("We need an email to send the good stuff!");

    if (phoneGroup.style.display === 'none') {
        phoneGroup.style.display = 'block';
        phoneGroup.classList.add('animate-in');
        document.getElementById('phone').focus();
        nextBtn.innerText = "Let's Continue →";
        return;
    }

    const phone = document.getElementById('phone').value;
    if (!phone) return alert("Drop your number, we promise no spam!");

    nextStep();
}

function selectOption(category, value, element) {
    formData[category] = value;
    
    // UI Update
    const siblingCards = element.parentElement.querySelectorAll('.option-card');
    siblingCards.forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
    
    // Auto-advance for simple MCQs after a small delay
    if (category !== 'building') { // Keep building step manual for city/country input
        setTimeout(nextStep, 400);
    }
}

function toggleMultiOption(category, value, element) {
    const index = formData[category].indexOf(value);
    if (index > -1) {
        formData[category].splice(index, 1);
        element.classList.remove('selected');
    } else {
        formData[category].push(value);
        element.classList.add('selected');
    }
}

function submitForm() {
    // Collect all data
    const finalData = {
        ...formData,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        brand: document.getElementById('brand').value,
        location: document.getElementById('location').value,
        vision: document.getElementById('vision').value,
        socials: {
            ig: document.getElementById('social-ig').value,
            web: document.getElementById('social-web').value,
            li: document.getElementById('social-li').value
        }
    };

    console.log("Submitting to Social Daddy:", finalData);
    
    // Transition to success
    const currentElem = document.getElementById(`step-9`);
    currentElem.classList.add('exit');
    
    setTimeout(() => {
        currentElem.classList.remove('active', 'exit');
        document.getElementById('step-success').classList.add('active');
        document.getElementById('progressBar').style.width = '100%';
        document.getElementById('progressText').innerText = "DONE! 😎";
    }, 500);
}

// Enter key support
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (currentStep === 2) {
            handleStep2();
        } else if (currentStep === 1 || currentStep === 3 || currentStep === 8) {
            nextStep();
        } else if (currentStep === 9) {
            submitForm();
        }
    }
});

// Auto-expand textarea
const textarea = document.getElementById('vision');
if (textarea) {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}
