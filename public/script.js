Vue.createApp({
  data() {
    return {
      total: 0,
      products: [],
      cart : [],
      search : "",
      lastSearch : "",
      loading: false
    };
  },
  methods: {
    addToCart(product) {
      this.total += product.price;
      const item = this.cart.find(item => item.id === product.id);
      if (item) {
        item.qty++;
      } else {
        this.cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          qty: 1
        });
      }
    },
    currency(price) {
      return "$".concat(price.toFixed(2));
    },
    inc(item) {
      item.qty++;
      this.total += item.price;
    },
    dec(item) {
      item.qty--;
      this.total -= item.price;
      if (item.qty <= 0) {
        const i =this.cart.indexOf(item);
        this.cart.splice(i, 1);
      }
    },
    onSubmit() {
      this.products = [];
      this.loading = true;
      fetch(`/search?q=${this.search}`)
      .then(response => response.json())
      .then(body => {
          this.lastSearch = this.search;
          this.products = body;
          this.loading = false;
        
      })
    }
  }
}).mount("#app");