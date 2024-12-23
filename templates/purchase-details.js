document.addEventListener('DOMContentLoaded', () => {
    const planDetails = JSON.parse(localStorage.getItem('selectedPlan'));
    
    if (planDetails) {
        document.getElementById('plan-title').textContent = planDetails.name;
        document.getElementById('plan-price').textContent = `Price: $${planDetails.price.toFixed(2)}/month`;
    } else {
        // Redirect to plans page if no plan is selected
        window.location.href = 'golden-ai.html';
    }

    // Handle form submission
    document.getElementById('purchase-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your purchase! A confirmation will be sent to your email.');
        // Optionally clear local storage
        localStorage.removeItem('selectedPlan');
        window.location.href = 'golden-ai.html'; // Redirect to plans page or main page
    });
});

// Function to handle choosing a plan
function choosePlan(planName, planPrice) {
    // Store plan details in local storage
    localStorage.setItem('selectedPlan', JSON.stringify({ name: planName, price: planPrice }));
    
    // Redirect to the purchase details page
    window.location.href = 'purchase-details.html';
}