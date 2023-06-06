import { useContext, useEffect } from 'react'
import { AppContext } from '../..'

export const Cart = () => {
    const { state, dispatch } = useContext(AppContext)

    const getCartData = async () => {
        try {
            const response = await fetch('/api/user/cart', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
            })
            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
        } catch (err) {
            console.error(err)
        }
    }

    console.log(state.cartList)

    useEffect(() => {
        getCartData()
    }, [])
    return (
        <div>
            <h1>My Cart</h1>
            <section>
                <ul>
                    {state.cartList.map(({ name }) => {
                        return <li>{name}</li>
                    })}
                </ul>
            </section>
        </div>
    )
}
