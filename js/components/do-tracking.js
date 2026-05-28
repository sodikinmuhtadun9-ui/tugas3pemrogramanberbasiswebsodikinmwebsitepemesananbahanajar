Vue.component('ba-do-tracking', {

    template: '#tpl-do-tracking',

    props: [
        'tracking',
        'paket'
    ],

    data: function () {

        return {

            search: '',

            hasilTracking: null,

            sudahCari: false,

            form: {

                nim: '',
                nama: '',
                ekspedisi: '',
                paket: ''

            }

        }

    },

    methods: {
        
        /* CARI DATA */
        cariData() {

            this.sudahCari = true;

            this.hasilTracking = null;

            for (let item of this.tracking) {

                let nomorDO =
                    Object.keys(item)[0];

                let dataDO =
                    item[nomorDO];

                if (

                    nomorDO
                    .toLowerCase()
                    .includes(
                        this.search.toLowerCase()
                    )

                    ||

                    dataDO.nim.includes(
                        this.search
                    )

                ) {

                    this.hasilTracking = {

                        no_do: nomorDO,

                        nim: dataDO.nim,

                        nama: dataDO.nama,

                        status: dataDO.status,

                        ekspedisi:
                            dataDO.ekspedisi,

                        tanggalKirim:
                            dataDO.tanggalKirim

                    };

                }

            }
            

        },
        

        /* RESET */
        resetCari() {

            this.search = '';

            this.hasilTracking = null;

            this.sudahCari = false;

        },

        /* AMBIL PAKET */
        getSelectedPaket() {

            return this.paket.find(

                p =>
                p.kode === this.form.paket

            );

        },

        /* TAMBAH DO */
        tambahDO() {

            if (

                !this.form.nim ||
                !this.form.nama ||
                !this.form.ekspedisi ||
                !this.form.paket

            ) {

                alert(
                    'Semua data wajib diisi!'
                );

                return;

            }

            let nomorBaru =

                'DO2025-00' +

                (this.tracking.length + 1);

            let paketDipilih =

                this.paket.find(

                    p =>
                    p.kode === this.form.paket

                );

            this.tracking.push({

                [nomorBaru]: {

                    nim: this.form.nim,

                    nama: this.form.nama,

                    status: 'Diproses',

                    ekspedisi:
                        this.form.ekspedisi,

                    tanggalKirim:
                        new Date()
                        .toLocaleDateString(),

                    paket:
                        this.form.paket,

                    total:
                        paketDipilih.harga,

                    perjalanan: []

                }

            });

            alert(
                'Delivery Order berhasil dibuat!'
            );

            this.form = {

                nim: '',

                nama: '',

                ekspedisi: '',

                paket: ''

            };

        }

    },
    watch: {

    /* WATCH PAKET */
    'form.paket': function(newValue) {

        if (newValue) {

            alert(
                'Paket berhasil dipilih!'
            );

        }

    },

    /* WATCH SEARCH */
    search: function(newValue) {

        if (newValue === '') {

            this.hasilTracking = null;

            this.sudahCari = false;

        }

    }

}

});