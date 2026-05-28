new Vue({

    el: '#app',

    data: {

        /* =========================
           TAB HALAMAN
        ========================= */
        tab: 'stok',

        /* =========================
           DATA JSON
        ========================= */
        stok: [],

        tracking: {},

        paket: [],

        upbjjList: [],

        kategoriList: [],

        /* =========================
           SEARCH GLOBAL
        ========================= */
        globalSearch: ""

    },

    /* =========================
       COMPUTED
    ========================= */
    computed: {

        totalStok() {

            return this.stok.length;

        },

        totalMenipis() {

            return this.stok.filter(

                item =>

                item.qty < item.safety &&
                item.qty > 0

            ).length;

        },

        totalKosong() {

            return this.stok.filter(

                item => item.qty === 0

            ).length;

        }

    },

    /* =========================
       WATCHER
    ========================= */
    watch: {

        tab(newValue) {

            console.log(
                "Pindah halaman ke:",
                newValue
            );

        },

        globalSearch(newValue) {

            console.log(
                "Search:",
                newValue
            );

        }

    },

    /* =========================
       METHODS
    ========================= */
    methods: {

        loadData() {

            fetch('./data/dataBahanAjar.json')

            .then(response => response.json())

            .then(data => {

                this.stok = data.stok;

                this.tracking = data.tracking;

                this.paket = data.paket;

                this.upbjjList =
                    data.upbjjList;

                this.kategoriList =
                    data.kategoriList;

            })

            .catch(error => {

                console.log(
                    "Gagal load JSON:",
                    error
                );

            });

        }

    },

    /* =========================
       CREATED
    ========================= */
    created() {

        this.loadData();

    }

});