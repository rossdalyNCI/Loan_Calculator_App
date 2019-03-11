// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000); // timeout set for 2s

    e.preventDefault();
}); // we get the loan-form element and we add an event listener and we listen for submit. Once that is submitted we want to call the function

// Calculate Results
function calculateResults(){ // here we are creating the calculateResults function that we called above
    console.log('Calculating...');
    // UI Vars - we are grabbing all the stuff we need from the UI
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); // we use parseFloat to turn the number into a decimal - we are taking the 'amount', getting a value for it and turning it into a decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12; // same as the principal but dividing by 100 then dividing by 12
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute the monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments); // Gives us to the power
    const monthly = (principal*x*calculatedInterest)/(x-1); // gives the monthly payment

    //validate to check if a finite number
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2); // toFixed used to fix the value to 2 decimal places
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers'); // calling the showError function
    }
}

// Show Error
function showError(error) { // creating the showError function we created earlier that takes the in the parameter or (error)
     // Hide results
     document.getElementById('results').style.display = 'none';

     // Hide loader
     document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div'); // the element we want to create is called 'div'

    // Get elements
    const card = document.querySelector('.card'); // class of card
    const heading = document.querySelector('.heading'); // class of heading

    // Add class
    errorDiv.className = 'alert alert-danger';
    
    // Create text node amd appemd to div
    errorDiv.appendChild(document.createTextNode(error)); // insert some text into the errorDiv using appendChild - the text will be whatever is passed into the event paramet being (error)

    // Insert error above heading
    card.insertBefore(errorDiv, heading); // using the insertBefore method that inserts the element that you want to put in before the parent element

    // Clear Error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear Error
function clearError(){ // creating the clearError function delcared above
    document.querySelector('.alert').remove(); // looking for the class of alert and removes it
}