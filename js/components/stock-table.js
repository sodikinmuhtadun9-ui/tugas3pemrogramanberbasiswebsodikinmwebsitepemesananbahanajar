Vue.component(

    'ba-stock-table',

    {

        props: [

            'stok',

            'upbjjList',

            'kategoriList'

        ],

        data() {

            return {

                filterUPBJJ: "",
                filterKategori: "",
                searchText: "",
                warningOnly: false,
                sortBy: "",
                editIndex: -1,
                hoverIndex: -1,
                form: {

    kode: "",
    judul: "",
    kategori: "",
    upbjj: "",
    lokasiRak: "",
    harga: "",
    qty: "",
    safety: ""

}
            }

        },

        /* =========================
           WATCHER
        ========================= */
        watch: {

            filterUPBJJ(newValue) {

                console.log(
                    "Filter UPBJJ:",
                    newValue
                );

                /* reset kategori */
                this.filterKategori = "";

            },

            searchText(newValue) {

                console.log(
                    "Search berubah:",
                    newValue
                );

            }

        },

        /* =========================
           METHODS
        ========================= */
        methods: {

            /* FILTER + SORT */
            getFilteredData() {

                let data = [...this.stok];

                /* FILTER UPBJJ */
                if (this.filterUPBJJ) {

                    data = data.filter(

                        item =>

                        item.upbjj ===
                        this.filterUPBJJ

                    );

                }

                /* FILTER KATEGORI */
                if (this.filterKategori) {

                    data = data.filter(

                        item =>

                        item.kategori ===
                        this.filterKategori

                    );

                }

                /* SEARCH */
                if (this.searchText) {

                    data = data.filter(

                        item =>

                        item.judul
                        .toLowerCase()
                        .includes(

                            this.searchText
                            .toLowerCase()

                        )

                    );

                }

                /* WARNING ONLY */
                if (this.warningOnly) {

                    data = data.filter(

                        item =>

                        item.qty <
                        item.safety

                    );

                }

                /* SORT JUDUL */
                if (this.sortBy === "judul") {

                    data.sort(

                        (a,b) =>

                        a.judul.localeCompare(
                            b.judul
                        )

                    );

                }

                /* SORT QTY */
                if (this.sortBy === "qty") {

                    data.sort(

                        (a,b) =>

                        a.qty - b.qty

                    );

                }

                /* SORT HARGA */
                if (this.sortBy === "harga") {

                    data.sort(

                        (a,b) =>

                        a.harga - b.harga

                    );

                }

                return data;

            },

            /* RESET */
            resetFilter() {

                this.filterUPBJJ = "";

                this.filterKategori = "";

                this.searchText = "";

                this.warningOnly = false;

                this.sortBy = "";

            },

            /* FORMAT HARGA */
            formatHarga(harga) {

                return "Rp " +

                    harga.toLocaleString();

            },

            /* FORMAT QTY */
            formatQty(qty) {

                return qty + " buah";

            },

            /* HAPUS */
            hapusData(kode) {

                const konfirmasi = confirm(

                    "Yakin ingin menghapus data?"

                );

                if (!konfirmasi) {

                    return;

                }

                const index = this.stok.findIndex(

                    item => item.kode === kode

                );

                if (index !== -1) {

                    this.stok.splice(index,1);

                }

            },
            getKategoriByUPBJJ() {

    let data = [...this.stok];

    /* FILTER UPBJJ */
    if (this.filterUPBJJ) {

        data = data.filter(

            item =>

            item.upbjj ===
            this.filterUPBJJ

        );

    }

    /* AMBIL KATEGORI UNIK */
    return [

        ...new Set(

            data.map(

                item => item.kategori

            )

        )

    ];

},
            editData(item, index) {

    this.editIndex = index;

    this.form = {

        kode: item.kode,
        judul: item.judul,
        kategori: item.kategori,
        upbjj: item.upbjj,
        lokasiRak: item.lokasiRak,
        harga: item.harga,
        qty: item.qty,
        safety: item.safety

    };

},
updateData() {

    if (this.editIndex === -1) {

        return;

    }

    this.stok.splice(

        this.editIndex,

        1,

        {

            ...this.form,

            harga: Number(this.form.harga),

            qty: Number(this.form.qty),

            safety: Number(this.form.safety),

            catatanHTML: "-"

        }

    );

    /* RESET */
    this.editIndex = -1;

    this.form = {

        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: "",
        qty: "",
        safety: ""

    };

    alert(
        "Data berhasil diupdate!"
    );

},
            tambahData() {

    /* VALIDASI */
    if (

        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj

    ) {

        alert(
            "Data belum lengkap!"
        );

        return;

    }

    /* PUSH DATA */
    this.stok.push({

        kode: this.form.kode,

        judul: this.form.judul,

        kategori: this.form.kategori,

        upbjj: this.form.upbjj,

        lokasiRak: this.form.lokasiRak,

        harga: Number(this.form.harga),

        qty: Number(this.form.qty),

        safety: Number(this.form.safety),

        catatanHTML: "-"

    });

    /* RESET FORM */
    this.form = {

        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: "",
        qty: "",
        safety: ""

    };

    alert(
        "Data berhasil ditambahkan!"
    );

},
        },

        /* =========================
           TEMPLATE
        ========================= */
        template: `

        <div class="page">

            <h2>
                📦 Stok Bahan Ajar
            </h2>

            <!-- FILTER -->
            <div class="filter-box">

                <!-- FILTER UPBJJ -->
                <select v-model="filterUPBJJ">

                    <option value="">
                        Semua UPBJJ
                    </option>

                    <option
    v-for="u in upbjjList"
    :key="u">

    {{ u }}

</option>

                </select>

                <!-- FILTER KATEGORI -->
                <select v-model="filterKategori">

                    <option value="">
                        Semua Kategori
                    </option>

                    <option
                        v-for="k in kategoriList"
                        :key="k">

                        {{ k }}

                    </option>

                </select>

                <!-- SORT -->
                <select v-model="sortBy">

                    <option value="">
                        Urutkan
                    </option>

                    <option value="judul">
                        Judul
                    </option>

                    <option value="qty">
                        Stok
                    </option>

                    <option value="harga">
                        Harga
                    </option>

                </select>

                <!-- SEARCH -->
                <input

                    type="text"

                    placeholder="Cari mata kuliah..."

                    v-model="searchText"

                >

                <!-- WARNING -->
                <label>

                    <input
                        type="checkbox"
                        v-model="warningOnly">

                    Warning Stock

                </label>

                <!-- RESET -->
                <button
                    @click="resetFilter">

                    Reset

                </button>

            </div>

            <!-- TABLE -->
            <table border="1">

                <thead>

                    <tr>

                        <th>Kode</th>

                        <th>Judul</th>

                        <th>Kategori</th>

                        <th>UPBJJ</th>

                        <th>Lokasi</th>

                        <th>Harga</th>

                        <th>Qty</th>

                        <th>Safety</th>

                        <th>Status</th>

                        <th>Aksi</th>

                    </tr>

                </thead>

                <tbody>

                    <tr

                        v-for="(item,index) in getFilteredData()"

                        :key="item.kode"

                    >

                        <td>
                            {{ item.kode }}
                        </td>

                        <td>
                            {{ item.judul }}
                        </td>

                        <td>
                            {{ item.kategori }}
                        </td>

                        <td>
                            {{ item.upbjj }}
                        </td>

                        <td>
                            {{ item.lokasiRak }}
                        </td>

                        <td>
                            {{ formatHarga(item.harga) }}
                        </td>

                        <td>
                            {{ formatQty(item.qty) }}
                        </td>

                        <td>
                            {{ formatQty(item.safety) }}
                        </td>

                        <!-- STATUS -->
                        <td

    @mouseover="hoverIndex = index"

    @mouseleave="hoverIndex = -1"

>

    <status-badge
        :qty="item.qty"
        :safety="item.safety">
    </status-badge>

    <!-- TOOLTIP -->
    <div

        v-if="hoverIndex === index"

        class="tooltip"

        v-html="item.catatanHTML"

    >

    </div>

</td>
                        <!-- AKSI -->
                        <td>

    <button
        @click="editData(item,index)">

        Edit

    </button>
    

    <button
        @click="hapusData(item.kode)">

        Hapus

    </button>

</td>

                    </tr>

                </tbody>

            </table>

            <!-- FORM -->
<div class="form-box">

    <h3>
        Tambah Data
    </h3>

    <input
        type="text"
        placeholder="Kode"
        v-model="form.kode"
        @keyup.enter="tambahData"
    >

    <input
        type="text"
        placeholder="Judul"
        v-model="form.judul"
        @keyup.enter="tambahData"
    >

    <select
        v-model="form.kategori">

        <option value="">
            Pilih Kategori
        </option>

        <option
            v-for="k in kategoriList">

            {{ k }}

        </option>

    </select>

    <select
        v-model="form.upbjj">

        <option value="">
            Pilih UPBJJ
        </option>

        <option
            v-for="u in upbjjList">

            {{ u }}

        </option>

    </select>

    <input
        type="text"
        placeholder="Lokasi Rak"
        v-model="form.lokasiRak"
    >

    <input
        type="number"
        placeholder="Harga"
        v-model="form.harga"
    >

    <input
        type="number"
        placeholder="Qty"
        v-model="form.qty"
    >

    <input
        type="number"
        placeholder="Safety"
        v-model="form.safety"
    >

    <!-- MODE TAMBAH -->
<button

    v-if="editIndex === -1"

    @click="tambahData">

    Simpan

</button>

<!-- MODE EDIT -->
<button

    v-else

    @click="updateData">

    Update

</button>

</div>

        </div>

        `

    }

);