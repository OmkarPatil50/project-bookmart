import { useParams } from 'react-router'
import './ProductDetails.css'
import ProductDetailsCard from '../../components/ProductDetailsCard/ProductDetailsCard'

export const ProductDetails = () => {
    const { bookID } = useParams()

    return (
        <div className="product-details-page">
            <ProductDetailsCard bookID={bookID} />
        </div>
    )
}
