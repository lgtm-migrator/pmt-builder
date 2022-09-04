let expect = require('chai').expect;
let pmtBuilder = require('../pmt-builder');
const txs3000 = require('./resources/3000-txs');

describe('PMT Builder', () => {
    it('should create a valid PMT, block with a single transaction', () => {
        let blockTransactions = [
            '8f01832aa125683490e70a9142ccd9c49485b84708180487b5f35dc7795a3afd'
        ];

        let resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[0]);
        let expectedPMT = '0100000001fd3a5a79c75df3b58704180847b88594c4d9cc42910ae790346825a12a83018f0101';
        
        expect(resultPmt.hex).to.be.eq(expectedPMT);
    });
    
    it('should create a valid PMT, small block with 6 transactions', () => {
        let blockTransactions = [
            '8f01832aa125683490e70a9142ccd9c49485b84708180487b5f35dc7795a3afd',
            '6cc629897f3f6c3e873e98af8061f54618fe2be6599853841ca97aeb9614a136',
            '31c8227345ead8477845fda6d8dc68cc1bca9c094523aef60d857d521aca6937',
            'e0714cbc5ed04014e1a1f362612fdb05578a1c8e45257ac6cc0dff0d2e532855',
            '0f9e8932b5bbcad80242077205843e42bcca9d84c58b751535ea07a06e4179e6',
            '5a4d2446ff81be95eacaaac0fcd06856f9625f6f07391a2bf90b1a065be0e0fc'
        ];

        // Different expected results depending on the filtered transaction selected
        let expectedPMTs = [
            '0600000004fd3a5a79c75df3b58704180847b88594c4d9cc42910ae790346825a12a83018f36a11496eb7aa91c84539859e62bfe1846f56180af983e873e6c3f7f8929c66c91dfb312b6927dadb46911bea0033a1e4b9583edd922b88dc8f8a3bb7a7b2469b3dbb45962f8c5002430d6aff3435e4975332c725115a00349222242aae12d01010f',
            '0600000004fd3a5a79c75df3b58704180847b88594c4d9cc42910ae790346825a12a83018f36a11496eb7aa91c84539859e62bfe1846f56180af983e873e6c3f7f8929c66c91dfb312b6927dadb46911bea0033a1e4b9583edd922b88dc8f8a3bb7a7b2469b3dbb45962f8c5002430d6aff3435e4975332c725115a00349222242aae12d010117',
            '060000000420c9a818e449bc1140a6560e5d82c5f5791d9264c431f7333d2e2bfa5059968b3769ca1a527d850df6ae2345099cca1bcc68dcd8a6fd457847d8ea457322c8315528532e0dff0dccc67a25458e1c8a5705db2f6162f3a1e11440d05ebc4c71e0b3dbb45962f8c5002430d6aff3435e4975332c725115a00349222242aae12d01011b',
            '060000000420c9a818e449bc1140a6560e5d82c5f5791d9264c431f7333d2e2bfa5059968b3769ca1a527d850df6ae2345099cca1bcc68dcd8a6fd457847d8ea457322c8315528532e0dff0dccc67a25458e1c8a5705db2f6162f3a1e11440d05ebc4c71e0b3dbb45962f8c5002430d6aff3435e4975332c725115a00349222242aae12d01012b',
            '060000000312a065824d735eb452895075379496f87eb48cf8a411a9a54d7301ab6b3e86d9e679416ea007ea3515758bc5849dcabc423e840572074202d8cabbb532899e0ffce0e05b061a0bf92b1a39076f5f62f95668d0fcc0aacaea95be81ff46244d5a011d',
            '060000000312a065824d735eb452895075379496f87eb48cf8a411a9a54d7301ab6b3e86d9e679416ea007ea3515758bc5849dcabc423e840572074202d8cabbb532899e0ffce0e05b061a0bf92b1a39076f5f62f95668d0fcc0aacaea95be81ff46244d5a012d'
        ];

        for (let i = 0; i < blockTransactions.length; i++) {
            let resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[i]);
            expect(resultPmt.hex).to.be.eq(expectedPMTs[i]);
        }
    });

    it('should create a valid PMT, block with an odd amount of transactions', () => {
        let blockTransactions = [
            '8f01832aa125683490e70a9142ccd9c49485b84708180487b5f35dc7795a3afd',
            '6cc629897f3f6c3e873e98af8061f54618fe2be6599853841ca97aeb9614a136',
            'e0714cbc5ed04014e1a1f362612fdb05578a1c8e45257ac6cc0dff0d2e532855',
            '0f9e8932b5bbcad80242077205843e42bcca9d84c58b751535ea07a06e4179e6',
            '5a4d2446ff81be95eacaaac0fcd06856f9625f6f07391a2bf90b1a065be0e0fc'
        ];

        // Different expected results depending on the filtered transaction selected
        let expectedPMTs = [
            '0500000004fd3a5a79c75df3b58704180847b88594c4d9cc42910ae790346825a12a83018f36a11496eb7aa91c84539859e62bfe1846f56180af983e873e6c3f7f8929c66ceecf96554cd7a9f81f2fefa5a011bac4bd9d7fc1dfcb8849cdfa08bdf10ee0bf5c5c330751e2612626c1f1d000bd57e611b09148ba26640a7af97d89aa5fe092010f',
            '0500000004fd3a5a79c75df3b58704180847b88594c4d9cc42910ae790346825a12a83018f36a11496eb7aa91c84539859e62bfe1846f56180af983e873e6c3f7f8929c66ceecf96554cd7a9f81f2fefa5a011bac4bd9d7fc1dfcb8849cdfa08bdf10ee0bf5c5c330751e2612626c1f1d000bd57e611b09148ba26640a7af97d89aa5fe0920117',
            '050000000420c9a818e449bc1140a6560e5d82c5f5791d9264c431f7333d2e2bfa5059968b5528532e0dff0dccc67a25458e1c8a5705db2f6162f3a1e11440d05ebc4c71e0e679416ea007ea3515758bc5849dcabc423e840572074202d8cabbb532899e0f5c5c330751e2612626c1f1d000bd57e611b09148ba26640a7af97d89aa5fe092011b',
            '050000000420c9a818e449bc1140a6560e5d82c5f5791d9264c431f7333d2e2bfa5059968b5528532e0dff0dccc67a25458e1c8a5705db2f6162f3a1e11440d05ebc4c71e0e679416ea007ea3515758bc5849dcabc423e840572074202d8cabbb532899e0f5c5c330751e2612626c1f1d000bd57e611b09148ba26640a7af97d89aa5fe092012b',
            '0500000002faff23f4125fa7835943afad413a00fe7127cebd4892a20db24a5010a292e8fdfce0e05b061a0bf92b1a39076f5f62f95668d0fcc0aacaea95be81ff46244d5a011d'
        ];

        for (let i = 0; i < blockTransactions.length; i++) {
            let resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[i]);
            expect(resultPmt.hex).to.be.eq(expectedPMTs[i]);
        }
    });

    it('should create a valid PMT, large block with over 3000 transactions', () => {
        const blockTransactions = txs3000.transactions;

        // Test with a few different filtered transactions
        let resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[0]);
        let expectedPMT = 'de0c00000d68101e92ce19aec6ca95e5f56b85c4f344ee89a49db4ed87e92d9e8845744eba72f5e40cff226665b5188733db71bc0026f723e2e7b1431e7a3f3da748fffe50045b6f9b0ad4b984d0cbfff9bc3fb936c4198055d7b9cea22f2f585a762124ccb3eb0955ba3da948730a6168a4ca278b0d80ce6bf6762f677eb14267dba84adb0bb3919c4648ca9cbdec22ddd15972b62e72c260fdd1bf8fca7b7dc29db20b8c011b8fde551f618df69b1b9f46da8cdfac68d90e0f019aef8f77226f73a534b059746c76b28b948a85a5332c9fb24a9682c4258cb67ff929fcf7bdd16591967e1c94e125f2465d7f882619da113bf0148fe1f6906cdc1f7c69d536b7bb372b33d0ed03f63e87db16bebb6e5a34353249a91f6d5c3474ae2e3218d107a3010a3407b0cd0bee035791b95b4544ac85e75e0aafb27ddc5f0aacb32cfed423f675e39d73cf2baaa20629c7997faa778e6333f0f89f07e9756977d70c946b642c57c1be886674fa7ffefb1a421ef02abe3aba989f33d76613249c8822c57df60ab5910641d0dfe22326e32f50af51df55af13010d7a341d63e523fc684e7a2e92d48a04ff1f0000';
        expect(resultPmt.hex).to.be.eq(expectedPMT);

        resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[1]);
        expectedPMT = 'de0c00000d68101e92ce19aec6ca95e5f56b85c4f344ee89a49db4ed87e92d9e8845744eba72f5e40cff226665b5188733db71bc0026f723e2e7b1431e7a3f3da748fffe50045b6f9b0ad4b984d0cbfff9bc3fb936c4198055d7b9cea22f2f585a762124ccb3eb0955ba3da948730a6168a4ca278b0d80ce6bf6762f677eb14267dba84adb0bb3919c4648ca9cbdec22ddd15972b62e72c260fdd1bf8fca7b7dc29db20b8c011b8fde551f618df69b1b9f46da8cdfac68d90e0f019aef8f77226f73a534b059746c76b28b948a85a5332c9fb24a9682c4258cb67ff929fcf7bdd16591967e1c94e125f2465d7f882619da113bf0148fe1f6906cdc1f7c69d536b7bb372b33d0ed03f63e87db16bebb6e5a34353249a91f6d5c3474ae2e3218d107a3010a3407b0cd0bee035791b95b4544ac85e75e0aafb27ddc5f0aacb32cfed423f675e39d73cf2baaa20629c7997faa778e6333f0f89f07e9756977d70c946b642c57c1be886674fa7ffefb1a421ef02abe3aba989f33d76613249c8822c57df60ab5910641d0dfe22326e32f50af51df55af13010d7a341d63e523fc684e7a2e92d48a04ff2f0000';
        expect(resultPmt.hex).to.be.eq(expectedPMT);

        resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[1001]);
        expectedPMT = 'de0c00000d6c8d31cff7da0e4d9397d95d8f8f97522573354ac082ca3597fd14786dad4f7c58c28161414ee3d97c150d4aa53d0e7d9837e22c706ae11bff5c5c17a61bbe8ad39e07934c9619a3de2fc7512bb6fdabcfb02faf4d2b895bc324306463f20aa449731157a69afb1f07ca0071a7085972969fb24fb05c1be6955d6e50c8fd784709b5fb480b70c492a4b7aa353a2fb33332bddc1cb32f3da901f4093e7abbf51412805c24faf250e8bd847cb64473cb76726c9164cb6436facdc429fdb711776f2e296d80dc81462a8623565625ce42aabe4fe3deec6b99b73cd91e085a5000f888fbfc50f51f6103c0bb04070df9357c86140b07afe7d3a739b9189d10620ba48e50490597f8dbf57425e4b2846f9eb2e4bf9a97007e0f7a098042f519f81eaa30c6dc1b51c4b47f0179bec32aa463920fe2f621d14f256380db3e9f865f298a3251d9245f1569c2a1ab28faa7bc1a2a8302b0764cbfe15a9ebbb2dff56707a9be886674fa7ffefb1a421ef02abe3aba989f33d76613249c8822c57df60ab5910641d0dfe22326e32f50af51df55af13010d7a341d63e523fc684e7a2e92d48a0457b50b00';
        expect(resultPmt.hex).to.be.eq(expectedPMT);

        resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[2800]);
        expectedPMT = 'de0c00000d6865fa6df021b3ca9828486804e65da669ad6e728445b2dbc50908292d5fc0f8eeb2ce57b14ab3a0adc4a5a2c5126f779f42446c7c043db25fc30bc7d52732576963fc20e7c0eeb0cfed973437fd2a05c67de93c0bbb1d18c1ddbd85b21bb3200035751bac441dcb24e9c4dbd70c808b6a4f6388126f5307363695b57faf921db8b0f6440f33054fb73960fe58d8913b930964fa3f5e6e1cc6b8a38be946b9774f2b4ac8a267ef7d2980693ccb5a6a100a4122495edecfbe0d5efb5d65e31906432fe4e341c92c294a7e0c5f9d16e95630c974cefca5c9358aa639dd3de8dc0f3ec2cf204700bcfc8b672b8469701fdfdf16bc4d2e3c81ce71ef6ba37507b1df22238fd61ec2ddc7d204804e20f8330e51f2bcbdb7717b3b1d22f1f6f1ed2673b962542a1376fa6301d70fc8745a3f2739822a6efc140da1c41e784f3a8e797e5d4c58fd77bc94d3d305a198b2e4ff64123221c660bb4b616c4edb62e4de47dce6eb07494a65c8bab19acd445c856ea8a8573fcad310e1fd385dee4ef6c82755ac03bc893f866fdb79b43f92aea03883b8d9982159264b4494373f38aab268c8046dd50700';
        expect(resultPmt.hex).to.be.eq(expectedPMT);

        resultPmt = pmtBuilder.buildPMT(blockTransactions, blockTransactions[3293]);
        expectedPMT = 'de0c0000096865fa6df021b3ca9828486804e65da669ad6e728445b2dbc50908292d5fc0f8f24cc35c45d5c556d711052239df3351f9c6ec06807b22819465c002da362210c23c429ab578a1574473be7231bb6d4863a9c544bf706a765a5ba4e2a428f77c64431ad750d8be98892b6098eb1a45dfdc864354e1d9eb0b692d5e02b19ff10a846a36d9ba8586f9f4a251b9cf1583e728a2c0234ba0f8531bd783d09ecbed0f094b478a03f283748f97761d0bd0c0fe50774baa221970bca5bcd17630f02700d69ba542836e4f35e7f931df29e60706c40a51ffb3f1628026b27ffef37342c323328a28ab35a0af61b5788cc6d5b64f4605a3e72f5bae344255d0d3036593e5a830e0e0dfaa09281757253c3925e878a8c27057fe0ecc5dfd26c484025f5fca0375ad16';
        expect(resultPmt.hex).to.be.eq(expectedPMT);

        // fail because the filtered transaction is not part of the transactions list
        let randomHash = '1000000000000000000000000000000000000000000000000000000000000001'
        expect(() => pmtBuilder.buildPMT(blockTransactions, randomHash)).to.throw('Filtered hash provided is not part of the leaves');
    });

    it('should fail when passing a filtered transaction that is not part of the block', () => {
        let blockTransactions = [
            '8f01832aa125683490e70a9142ccd9c49485b84708180487b5f35dc7795a3afd',
            '6cc629897f3f6c3e873e98af8061f54618fe2be6599853841ca97aeb9614a136',
            '31c8227345ead8477845fda6d8dc68cc1bca9c094523aef60d857d521aca6937',
            'e0714cbc5ed04014e1a1f362612fdb05578a1c8e45257ac6cc0dff0d2e532855',
            '0f9e8932b5bbcad80242077205843e42bcca9d84c58b751535ea07a06e4179e6',
            '5a4d2446ff81be95eacaaac0fcd06856f9625f6f07391a2bf90b1a065be0e0fc',
        ];

        let randomHash = '1000000000000000000000000000000000000000000000000000000000000001'

        // fail because the filtered transaction is not part of the transactions list
        expect(() => pmtBuilder.buildPMT(blockTransactions, randomHash)).to.throw('Filtered hash provided is not part of the leaves');
    });
});
