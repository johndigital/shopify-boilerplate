import homePage from '~/js/pages/home'
import '~/scss/main.scss'

// Bootstrap functions
const runOnce = () => {
    // Global jQuery load if needed
    // require('~/js/features/jQuery')
}

// Every-page functions
const runEachPage = () => {
    homePage()
}

// Primary
const onReady = () => {
    // Remove these two lines if not using barba
    const barba = require('~/js/features/barba').default
    barba.hooks.after(runEachPage)

    // Run for initial
    // page load
    runOnce()
    runEachPage()
}

// Wait for content ready
document.addEventListener('DOMContentLoaded', onReady)
