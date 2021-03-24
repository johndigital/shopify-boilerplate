import '../scss/main.scss'

const init = () => {
    // Global page transitions
    require('~/js/features/barba')

    // Make jQuery available globally
    // require('~/js/features/jQuery')

    // Use vue if needed
    // require('~/js/features/vue')
}

// Doc ready
document.addEventListener('DOMContentLoaded', init)
