export default class CandidateService {
    candidates = [
        { id: 1, fullname: 'Manatsa Chinyeruse', email: 'manatsa@gmail.com', idnumber: '14-169737M14', phone: '0776298063', address: '735 Sunway City', corporate: 'Africaid - Zvandiri', country: 'Zimbabwe' },
        { id: 2, fullname: 'Nelson Madziwa', email: 'nmadziwa@gmail.com', idnumber: '00-123457Y12', phone: '0733680463', address: '18 Chimbwa Close Glenview Harare', corporate: 'Doves Holdings', country: 'Zimbabwe' },
        { id: 1, fullname: 'Manatsa Chinyeruse', email: 'manatsa@gmail.com', idnumber: '14-169737M14', phone: '0776298063', address: '735 Sunway City', corporate: 'Africaid - Zvandiri', country: 'Zimbabwe' },
        { id: 2, fullname: 'Nelson Madziwa', email: 'nmadziwa@gmail.com', idnumber: '00-123457Y12', phone: '0733680463', address: '18 Chimbwa Close Glenview Harare', corporate: 'Doves Holdings', country: 'Zimbabwe' },
        { id: 1, fullname: 'Manatsa Chinyeruse', email: 'manatsa@gmail.com', idnumber: '14-169737M14', phone: '0776298063', address: '735 Sunway City', corporate: 'Africaid - Zvandiri', country: 'Zimbabwe' },
        { id: 2, fullname: 'Nelson Madziwa', email: 'nmadziwa@gmail.com', idnumber: '00-123457Y12', phone: '0733680463', address: '18 Chimbwa Close Glenview Harare', corporate: 'Doves Holdings', country: 'Zimbabwe' },
        { id: 1, fullname: 'Manatsa Chinyeruse', email: 'manatsa@gmail.com', idnumber: '14-169737M14', phone: '0776298063', address: '735 Sunway City', corporate: 'Africaid - Zvandiri', country: 'Zimbabwe' },
        { id: 2, fullname: 'Nelson Madziwa', email: 'nmadziwa@gmail.com', idnumber: '00-123457Y12', phone: '0733680463', address: '18 Chimbwa Close Glenview Harare', corporate: 'Doves Holdings', country: 'Zimbabwe' },
        { id: 1, fullname: 'Manatsa Chinyeruse', email: 'manatsa@gmail.com', idnumber: '14-169737M14', phone: '0776298063', address: '735 Sunway City', corporate: 'Africaid - Zvandiri', country: 'Zimbabwe' },
        { id: 2, fullname: 'Nelson Madziwa', email: 'nmadziwa@gmail.com', idnumber: '00-123457Y12', phone: '0733680463', address: '18 Chimbwa Close Glenview Harare', corporate: 'Doves Holdings', country: 'Zimbabwe' },
        { id: 1, fullname: 'Manatsa Chinyeruse', email: 'manatsa@gmail.com', idnumber: '14-169737M14', phone: '0776298063', address: '735 Sunway City', corporate: 'Africaid - Zvandiri', country: 'Zimbabwe' },
        { id: 2, fullname: 'Nelson Madziwa', email: 'nmadziwa@gmail.com', idnumber: '00-123457Y12', phone: '0733680463', address: '18 Chimbwa Close Glenview Harare', corporate: 'Doves Holdings', country: 'Zimbabwe' },
    ];

    addCandidate(candidate) {
        candidate.id = this.candidates.length;
        this.candidates.push(candidate);
    }


    getCandidates() {
        return this.candidates;
    }

    deleteCandidate(candidate) {
        // yet to be implemented
    }

}