export const locations: {
    1: {
        id: number;
        name: string;
        address: string;
        reviewLead: string;
        latLong: string;
        rating: number;
        facilities: string[];
        distance: string;
        openingHours: string[];
        reviews: {
            rating: number;
            author: string;
            date: string;
            text: string;
        }[];
    };
    2: {
        id: number;
        name: string;
        address: string;
        rating: number;
        facilities: string[];
        distance: string;
        openingHours: string[];
        reviewLead: string;
        latLong: string;
        reviews: {
            rating: number;
            author: string;
            date: string;
            text: string;
        }[];
    };
    3: {
        id: number;
        name: string;
        address: string;
        rating: number;
        facilities: string[];
        distance: string;
        reviewLead: string;
        latLong: string;
        openingHours: string[];
        reviews: {
            rating: number;
            author: string;
            date: string;
            text: string;
        }[];
    };
};
export namespace about {
    const title: string;
    namespace pageHeader {
        const title_1: string;
        export { title_1 as title };
        export const tagline: string;
    }
}
export namespace test {
    const title_2: string;
    export { title_2 as title };
    export namespace pageHeader_1 {
        const title_3: string;
        export { title_3 as title };
    }
    export { pageHeader_1 as pageHeader };
    export const numbers: string[];
}
