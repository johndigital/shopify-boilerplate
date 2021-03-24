import barba from '@barba/core'

barba.init({
    prevent: ({ el }) => el.classList && el.classList.contains('barba-prevent'),
    transitions: [
        {
            name: 'default',
            leave(data) {
                return new Promise((res) => {
                    data.current.container.classList.add('fade-out')
                    data.current.container.addEventListener('animationend', res)
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

export default barba
