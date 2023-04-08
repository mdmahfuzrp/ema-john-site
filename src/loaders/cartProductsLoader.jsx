import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    const data = await fetch('products.json');
    const products = await data.json();
    // console.log('products: ', products); // all products

    const storedCart = getShoppingCart();
    // console.log('storedCart: ', storedCart); // local storage data
    const savedCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    return savedCart;
}

export default cartProductsLoader;