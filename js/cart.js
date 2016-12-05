Vue.component('product', {
    props: {
        name: {
            required: true,
            type: String
        },
        quantity: {
            default: 0,
            type: Number,
            validator: function(value) {
                return value >= 0
            }
        },
        price: {
            required: true,
            type: Number,
            validator: function(value) {
                return value > 1
            }
        }
    },
    template: "<div>" +
                   "<button class='btn-success btn-xs' @click.prevent='quantityChanged(1)'>+</button>" +
                       "<span class='name'>{{ name }} — ${{ price }}</span>" +
                   "<button class='btn-danger btn-xs' @click.prevent='quantityChanged(-1)'>-</button>" +
               "</div>",

    methods: {
        quantityChanged: function(quantity_delta){
            if (quantity_delta == 1)
                this.$emit('add')
            else
                this.$emit('remove')
        }
    }
})

new Vue({
    el: '#shop',
    data: {
        store: {
          products: []
        },
        cart: {
            products: [],
            price_total: 0,
            quantity_total: 0,
        },
        initial_products: [
            { name: 'Bananas', price: 3 },
            { name: 'Apples', price: 2 },
            { name: 'Nuts', price: 5 },
            { name: 'Almonds', price: 10 }
        ]
    },

    methods: {
        addProduct: function(product) {
            this.cart.products[product.name].quantity += 1
            this.cart.products[product.name].subtotal += product.price
            this.cart.price_total += product.price
            this.cart.quantity_total += 1
        },
        removeProduct: function(product) {
            if (this.cart.products[product.name].quantity == 0) {
                alert("There's no more " + product.name + " in the cart.")
            } else {
                this.cart.products[product.name].quantity -= 1
                this.cart.products[product.name].subtotal -= product.price
                this.cart.price_total -= product.price
                this.cart.quantity_total -= 1
            }
        },
        emptyCart: function() {
            if (confirm("Are you sure?")) {
                var self = this
                this.initial_products.forEach(function(product_hash){
                    self.cart.products[product_hash.name] = { quantity: 0, subtotal: 0 }
                })
                this.cart.price_total = 0
                this.cart.quantity_total = 0
            }
        },
    },

    created: function() {
        var self = this

        this.initial_products.forEach(function(product_hash){
            self.store.products.push(product_hash)
            self.cart.products[product_hash.name] = { quantity: 0, subtotal: 0 }
        })
    }
})
