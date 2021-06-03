<template>
	<v-form>
		<v-container class="mt-8">
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="software.name" label="Name" required></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="software.producer" label="Producer"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4">
					<v-select v-model="licenseType" :items="this.licenseTypes" label="License Type" required></v-select>
				</v-col>
				<v-col cols="12" md="4" v-if="licenseType === 'License-ID / License-Key'">
					<v-text-field v-model="software.licenseId" label="License-ID" :append-icon="'mdi-content-copy'" ref="licenseId" @click:append="CopyToClipboard('licenseId')"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="software.licenseKey" label="License-Key" :append-icon="'mdi-content-copy'" ref="licenseKey" @click:append="CopyToClipboard('licenseKey')"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="software.numberLicense" label="Number of License"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="software.expiryDate" label="Expiry Date"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="software.offlineArchive" label="Offline Archive"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-select v-model="software.state" :items="this.softwareStates" label="State" required></v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-btn color="success" @click="SaveSoftware">
						<v-icon left>mdi-content-save-outline</v-icon>{{ $tc('save') }}
					</v-btn>
					<v-btn @click="CancelSoftware" class="ml-4">
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
							<v-tab>{{ $tc('user', 2) }}</v-tab>
							<v-tab>{{ $tc('barcode', 2) }}</v-tab>
							<v-tab-item>
								<Comments type="software" :id="this.software._id" />
							</v-tab-item>
							<v-tab-item>
								<Documents type="software" :id="this.software._id" />
							</v-tab-item>
							<v-tab-item>
								<Files type="software" :id="this.software._id" />
							</v-tab-item>
							<v-tab-item>
								<User type="software" :id="this.software._id" />
							</v-tab-item>
							<v-tab-item>
								<Barcodes type="software" :id="this.software._id" />
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
import Comments from '@/components/Comments.vue';
import Documents from '@/components/Documents.vue';
import Barcodes from '@/components/Barcodes.vue';
import Files from '@/components/Files.vue';
import User from '@/components/User.vue';

export default Vue.extend({
	name: "SoftwareDetails",

	components: {
		Barcodes,
		Comments,
		Documents,
		Files,
		User
	},

	data () {
		return {
			softwareStates: [
				'active',
				'inactive',
				'expired'
			],
			licenseType: null,
			licenseTypes: [
				'License-Key',
				'License-ID / License-Key'
			],
			software: {
				_id: null,
				name: null,
				producer: null,
				licenseId: null,
				licenseKey: null,
				numberLicense: null,
				state: null,
				expiryDate: null,
				offlineArchive: null,
			}
		}
	},

	computed: {
		IsNew: function () {
			return (this.software._id === null);
		}
	},

	methods: {
		GetLicenseType: function () {
			if (this.software.licenseId) {
				return 'License-ID / License-Key';
			} else {
				return 'License-Key';
			}
		},
		GetSoftware () {
			if (this.$route.params.id) {
				AxiosApi.get(`/software/${this.$route.params.id}`).then((response) => {
					this.software._id = response.data.id,
					this.software.name = response.data.name,
					this.software.producer = response.data.producer,
					this.software.licenseId = response.data.licenseId,
					this.software.licenseKey = response.data.licenseKey,
					this.software.numberLicense = response.data.numberLicense,
					this.software.state = response.data.state,
					this.software.expiryDate = response.data.expiryDate,
					this.software.offlineArchive = response.data.offlineArchive
				});
			}
		},
		CancelSoftware () {
			this.software = {
				_id: null,
				name: null,
				producer: null,
				licenseId: null,
				licenseKey: null,
				numberLicense: null,
				state: null,
				expiryDate: null,
				offlineArchive: null,
			};

			this.$router.push('/software');
		},
		CopyToClipboard (reference) {
			navigator.clipboard.writeText(this.$refs[reference].value);
		},
		SaveSoftware () {
			const data = {
				name: this.software.name,
				producer: this.software.producer,
				licenseId: this.software.licenseId,
				licenseKey: this.software.licenseKey,
				numberLicense: this.software.numberLicense,
				state: this.software.state,
				expiryDate: this.software.expiryDate,
				offlineArchive: this.software.offlineArchive
			};

			if (this.software._id) {
				AxiosApi.put(`/software/${this.software._id}`, data).then(() => {
					this.$router.push('/software');
				});
			} else {
				AxiosApi.post("/software", data).then(() => {
					this.$router.push('/software');
				});
			}
		},
	},

  created () {
		this.GetSoftware();
		this.licenseType = this.GetLicenseType();
	}
});
</script>
