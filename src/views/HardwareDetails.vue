<template>
	<v-form>
		<v-container class="mt-8">
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="hardware.name" label="Name" required></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="hardware.producer" label="Producer" required></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4">
					<v-select v-model="hardware.type" :items="this.hardwareTypes" label="Type" required></v-select>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="hardware.serialNumber" label="Serial Number" required></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="hardware.purchaseDate" label="Purchase Date"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="hardware.warrantyDate" label="Warranty Date"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="hardware.offlineArchive" label="Offline Archive"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-select v-model="hardware.state" :items="this.hardwareStates" label="State" required></v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-btn color="success" @click="SaveHardware">
						<v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}
					</v-btn>
					<v-btn @click="CancelHardware" class="ml-4">
						<v-icon left>mdi-close</v-icon>{{ $tc('cancel') }}
					</v-btn>
				</v-col>
			</v-row>
			<v-row class="mt-12">
				<v-col cols="12" md="8">
					<v-card v-if="!IsNew">
						<v-tabs dark>
							<v-tab>{{ $tc('comment', 2) }}</v-tab>
							<v-tab>{{ $tc('document', 2) }}</v-tab>
							<v-tab>{{ $tc('file', 2) }}</v-tab>
							<v-tab>{{ $tc('software', 2) }}</v-tab>
							<v-tab>{{ $tc('user', 2) }}</v-tab>
							<v-tab>{{ $tc('barcode', 2) }}</v-tab>
							<v-tab-item>
								<Comments type="hardware" :id="this.hardware._id"/>
							</v-tab-item>
							<v-tab-item>
								<Documents type="hardware" :id="this.hardware._id"/>
							</v-tab-item>
							<v-tab-item>
								<Files type="hardware" :id="this.hardware._id"/>
							</v-tab-item>
							<v-tab-item>
								<Software type="hardware" :id="this.hardware._id"/>
							</v-tab-item>
							<v-tab-item>
								<User type="hardware" :id="this.hardware._id"/>
							</v-tab-item>
							<v-tab-item>
								<Barcodes type="hardware" :id="this.hardware._id"/>
							</v-tab-item>
						</v-tabs>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script lang="js">
import Vue from "vue";
import AxiosApi from "@/plugins/axios";
import Comments from "@/components/Comments.vue";
import Documents from "@/components/Documents.vue";
import Software from "@/components/Software.vue";
import Barcodes from "@/components/Barcodes.vue";
import Files from "@/components/Files.vue";
import User from "@/components/User.vue";

export default Vue.extend({
	name: "HardwareDetails",

	components: {
		Barcodes,
		Comments,
		Documents,
		Files,
		Software,
		User
  },

	data () {
		return {
			hardwareStates: [
				'active',
				'inactive',
				'spare',
			],
			hardwareTypes: [
				'Computer',
				'HDD / SSD',
				'Monitor',
				'Notebook',
				'Router',
				'Switch',
			],
			hardware: {
				_id: null,
				name: null,
				producer: null,
				serialNumber: null,
				type: null,
				purchaseDate: null,
				warrantyDate: null,
				state: null,
				offlineArchive: null,
			}
		}
	},

	computed: {
		IsNew: function () {
			return (this.hardware._id === null);
		}
	},

	methods: {
		GetHardware () {
			if (this.$route.params.id) {
				AxiosApi.get(`/hardware/${this.$route.params.id}`).then(response => {
					this.hardware._id = response.data.id,
					this.hardware.name = response.data.name,
					this.hardware.producer = response.data.producer,
					this.hardware.serialNumber = response.data.serialNumber,
					this.hardware.type = response.data.type,
					this.hardware.purchaseDate = response.data.purchaseDate,
					this.hardware.warrantyDate = response.data.warrantyDate,
					this.hardware.state = response.data.state,
					this.hardware.offlineArchive = response.data.offlineArchive
				});
			}
		},
		CancelHardware () {
			this.hardware = {
				_id: null,
				name: null,
				producer: null,
				serialNumber: null,
				type: null,
				purchaseDate: null,
				warrantyDate: null,
				state: null,
				offlineArchive: null
			};

			this.$router.push('/hardware');
		},
		SaveHardware () {
			const data = {
				name: this.hardware.name,
				producer: this.hardware.producer,
				serialNumber: this.hardware.serialNumber,
				type: this.hardware.type,
				purchaseDate: this.hardware.purchaseDate,
				warrantyDate: this.hardware.warrantyDate,
				state: this.hardware.state,
				offlineArchive: this.hardware.offlineArchive
			};

			if (this.hardware._id) {
				AxiosApi.put(`/hardware/${this.hardware._id}`, data).then(() => {
					this.$router.push('/hardware');
				});
			} else {
				AxiosApi.post("/hardware", data).then(() => {
					this.$router.push('/hardware');
				});
			}
		}
	},

  created () {
		this.GetHardware();
	},
});
</script>
