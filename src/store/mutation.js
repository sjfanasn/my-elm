const SAVE_GEOHASH = 'SAVE_GEOHASH';
const RECORD_ADDRESS = 'RECORD_ADDRESS';
export default {
    [SAVE_GEOHASH](state, geohash) { 
        state.geohash = geohash;
    },
    [RECORD_ADDRESS](state, { 
        latitude,
        longitude  
    }) { 
        state.latitude = latitude;
        state.longitude = longitude;
    }
}