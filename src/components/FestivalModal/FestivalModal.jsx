import React, { useContext } from 'react'
import './FestivalModal.css'
import { AppContext } from '../..'
import Garland from '../Garland/Garland'

const FestivalModal = () => {
    const { dispatch } = useContext(AppContext)

    return (
        <div className="modal">
            <Garland />
            <div className="modal-box">
                <img
                    src="https://i.pinimg.com/originals/2d/07/d3/2d07d3898f0344fc6ac3b2d4fe40c3c0.jpg"
                    alt="modal"
                    className="modal-img"
                />
                <button
                    className="btn-close-modal"
                    onClick={() => {
                        dispatch({ type: 'TOGGLE_SHOW_FESTIVAL_MODAL' })
                    }}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h1 className="modal-tag wish-you-tag">Wishing You...</h1>

                <section className="modal-info">
                    <h1 className="modal-tag">
                        Shop Now to get 50% off on Books!
                    </h1>
                </section>
            </div>
        </div>
    )
}

export default FestivalModal
