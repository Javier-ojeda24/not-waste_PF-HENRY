import { useDispatch } from "react-redux";
import { deleteProduct, postPost } from "../../redux/actions";

const dispatch = useDispatch

function registerPost (data) {
    dispatch(postPost(data))
}

function disDeleteProduct(data) {
    dispatch(deleteProduct(data))
}

export {registerPost, disDeleteProduct}