import barba from '@barba/core'
import '../scss/main.scss'
import 'babel-polyfill'

const init = async () => {
    barba.init({
        transitions: [
            {
                name: 'default',
                leave(data) {
                    return new Promise((res) => {
                        data.current.container.classList.add('fade-out')
                        data.current.container.addEventListener(
                            'animationend',
                            res
                        )
                    })
                },
                enter(data) {
                    return new Promise((res) => {
                        data.next.container.classList.add('fade-in')
                        const rmvClass = () => {
                            data.next.container.classList.remove('fade-in')
                            data.next.container.removeEventListener(
                                'animationend',
                                rmvClass
                            )
                            return res(true)
                        }
                        data.next.container.addEventListener(
                            'animationend',
                            rmvClass
                        )
                    })
                },
            },
        ],
    })
}

// Doc ready
document.addEventListener('DOMContentLoaded', init)
