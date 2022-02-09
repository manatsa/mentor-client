export default class CorporateService {
    corporates = [
        { id: 1, name: 'Doves Holdings', address: '157 harare Street, Harare', type: 'insurance' },
        { id: 2, name: 'Telecel Zimbabwe', address: '148 Seke Rd, Graniteside, Harare', type: 'Telecommunications' },
        { id: 3, name: 'Africaid - Zvandiri', address: '12 Stoneridge way, Avondale, Harare', type: 'Non-Governmental Organisation' },
    ];

    addCorporate(corporate) {
        this.corporates.push(corporate);
    }

    getCorporates() {
        return this.corporates;
    }

    deleteCorporate(corporate) {
        let corp = this.corporates.filter(e => corporate.id === e.id)
        return this.corporates.splice(corp, 1)

    }
}