<template>
<div>
    <div class="search-box">
        <span><i class="fas fa-search"></i></span>
        <input type="text" v-model="search" @keyup.enter="searchProduct" class="search" placeholder="Search name product">
    </div>
    <div v-if="!search" class="box4">
        <div v-for="coffee in getDataType" :key="coffee.idProduct" class="card" @click="toProductDetails(coffee.idProduct)">
            <div class="photo-product">
                <img :src="coffee.photoProduct ? coffee.photoProduct : '../../../../assets/coffee-logo-symbol-19.png'" alt="image2">
            </div>
            <p class="productname">{{ coffee.productName }}</p>
            <p class="price">{{ coffee.price }}</p>
            <button class="edit3" @click="goPageEditProducts(coffee.idProduct)"><img src="../../../../assets/pen.png" alt=""></button>
        </div>
    </div>

    <div v-if="search" class="box4">
        <div v-for="coffee in searchName" :key="coffee.idProduct" class="card" @click="toProductDetails(coffee.idProduct)">
            <div class="photo-product">
                <img :src="coffee.photoProduct ? coffee.photoProduct : '../../../../assets/coffee-logo-symbol-19.png'" alt="image2">
            </div>
            <p class="productname">{{ coffee.productName }}</p>
            <p class="price">{{ coffee.price }}</p>
            <button class="edit3" @click="goPageEditProducts(coffee.idProduct)"><img src="../../../../assets/pen.png" alt=""></button>
        </div>
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination pagination-lg justify-content-center">
            <li class="page-item" :class="[getPagination.prevPage == null ? 'disabled' : '']"><a class="page-link" href="#" @click.prevent="getProductCoffee(parseInt(getPagination.currentPage) - 1)">Previous</a></li>
            <li v-for="noPage in getPagination.totalPage" :key="noPage" :class="[getPagination.currentPage == noPage ? 'active' : '']" class="page-item"><a class="page-link" href="#" @click.prevent="getProductCoffee(noPage)">{{noPage}}</a></li>
            <li class="page-item" :class="[getPagination.currentPage == getPagination.totalPage ? 'disabled' : '']"><a class="page-link" href="#" @click.prevent="getProductCoffee(parseInt(getPagination.currentPage) + 1)">Next</a></li>
        </ul>
    </nav>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CoffeeAdmin',
  data () {
    return {
      dataCoffee: '',
      search: '',
      searchName: ''
    }
  },
  methods: {
    ...mapActions(['getProductCoffee', 'getProductName']),
    // async handleGetProductCoffee () {
    //   const result = await this.getProductCoffee()
    //   this.dataCoffee = result.products
    // },
    async searchProduct () {
      this.searchName = await this.getProductName(this.search)
    },
    toProductDetails (idProduct) {
      this.$router.push({ path: '/home/product-details/' + idProduct, query: { type: 'coffee' } })
    },
    goPageEditProducts (id) {
      this.$router.push(`/home/edit-product-admin/${id}`)
    }
  },
  watch: {
    search (newSearch, oldSearch) {
      console.log('New search is', newSearch)
      console.log('Old search is', oldSearch)
      this.searchProduct()
    }
  },
  mounted () {
    this.getProductCoffee()
    this.searchProduct()
  },
  computed: {
    ...mapGetters(['getPagination', 'getDataType'])
  }
}
</script>

<style scoped>
.search-box {
    position: relative;
}

.search-box input {
    width: 250px;
    height: 54px;
    background: rgba(58, 61, 66, 0.1);
    border-radius: 12px;
    border: none;
    margin-top: 3%;
    margin-left: 500px;
    padding-left: 45px;
}

.search-box input:focus {
    outline: none;
}

.search-box span {
    color: #A9A9A9;
    margin-left: 60%;
    position: absolute;
    top: 52%;
}

nav {
    margin-top: 100px;
    margin-left: 130px;
}
.text {
    width: 174px;
    height: 30px;

    margin-top: 29px;

    font-family: Rubik;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 30px;

    color: #6A4029;
}

.text1 {
    width: 235px;
    height: 36px;

    margin-top: 46px;

    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: center;

    color: #000000;
}
.img {
    position: absolute;
    top: -420px;
    left: 40px;
}

.text2 {
    position: absolute;
    width: 180px;
    height: 32px;
    left: 60px;
    top: -270px;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 101.34%;

    color: #000000;
}

.text3 {
    position: absolute;
    width: 180px;
    height: 32px;
    left: 95px;
    top: -240px;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 101.34%;

    color: #000000;
}

.text4 {
    position: absolute;
    width: 247px;
    height: 28px;
    left: 20px;
    top: -210px;

    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 101.34%;

    text-align: center;

    color: #000000;
}

.borderdashed {
    position: absolute;
    width: 284.02px;
    height: 0px;
    top: -150px;

    border: 1px dashed #000000;
}

.text5 {
    position: absolute;
    left: 80px;
    top: -120px;

    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 101.34%;

    color: #000000;
}

.text6 {
    position: absolute;
    width: 166px;
    height: 33px;
    left: 55px;
    top: -90px;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 33px;
    line-height: 101.34%;

    color: #000000;
}

.text7 {
    position: absolute;
    width: 173px;
    height: 12px;
    left: 45px;
    top: -40px;

    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 101.34%;

    text-align: center;

}

.applycoupon {
    width: 284px;
    height: 64px;

    margin-top: 45px;
    margin-bottom: 112px;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 25px;

    color: #FFFFFF;

    background: #6A4029;
    border: none;
    border-radius: 20px;
}

.applycoupon:focus {
    outline: none;
}

.box3 {
    margin-left: -70px;
    margin-bottom: 67px;
}

.text8 {
    margin-left: 25px;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 14px;

    color: #4F5665;
}

.box4 {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    margin-top: 65px;
    margin-left: 82px;
    margin-right: 82px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 150px;

    margin-bottom: 30px;

    background: #FFFFFF;
    box-shadow: 0px 30px 60px rgba(57, 57, 57, 0.1);
    border-radius: 30px;
    padding:20px;
    box-sizing: content-box;
}

.edit3 {
    width: 30px;
    height: 30px;

    margin-left: 130px;

    border: none;
    border-radius: 20px;
    background: #6A4029;
}

.edit3:focus {
    outline: none;
}

.productname {
    width: 117px;
    height: 61px;

    font-family: Poppins;
    font-style: normal;
    font-weight: 900;
    font-size: 22px;
    line-height: 101.34%;
    text-transform: capitalize;

    text-align: center;

    color: #000000;
    margin:10px 0 0 0 ;
}

.price {
    width: 135.13px;
    height: 14.93px;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    line-height: 25px;
    text-align: center;

    color: #6A4029;
}
.photo-product img{
    width: 100%;
    height:100%;
    object-fit:cover;
    border-radius: 50%;
}
.photo-product {
    width: 120px;
    height: 120px;
}
</style>
