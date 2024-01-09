var healthyFoodsList = [
    {
        name: 'Khao Soi',
        type: 'Lunch',
        imageurl: 'https://img.freepik.com/free-photo/top-view-tasty-cooked-vegetables-with-seasonings-greens-blue-table-dish-meal-meat-cuisine-food-family-taste_140725-144670.jpg?w=1480&t=st=1704789829~exp=1704790429~hmac=178cc801b5a842f466cc4198239a9f850a239e9e325190e8a173ea545e798682',
        cal: 50,
        completed: false,
        reps: 10
    },
    { 
        name: 'Ramen', 
        type: 'Dinner', 
        imageurl: 'https://img.freepik.com/free-photo/dietary-salad-with-mussels-quail-eggs-cucumbers-radish-lettuce-healthy-food-seafood-salad-top-view-flat-lay_2829-6491.jpg?w=1480&t=st=1704788904~exp=1704789504~hmac=4e9feb87df3755131c182f1c9f0d4d6b03521c234b8920f7735048ef49c07b14',
        cal: 50,
        completed: false,
        reps: 10 
    },
    { 
        name: 'Bibimbap', 
        type: 'Lunch', 
        imageurl: 'https://img.freepik.com/free-photo/vegetables-with-olives-tomatoes-dark-surface_2829-14086.jpg?w=1480&t=st=1704788904~exp=1704789504~hmac=e276e27f35ff92c16702e398c7cc1ac5e164f59e691a4e4ee45fac7d57ecb8ec',
        cal: 50,
        completed: false,
        reps: 12 
    },
    { 
        name: 'Poke', 
        type: 'Lunch', 
        imageurl: 'https://img.freepik.com/free-photo/baked-meatballs-chicken-fillet-with-garnish-with-quinoa-boiled-broccoli-proper-nutrition-sports-nutrition-dietary-menu-top-view_2829-20095.jpg?w=1480&t=st=1704788907~exp=1704789507~hmac=aa46beccf7a83a15dbed072707c060d7c82975a77e2196a2091901c144936f19', 
        cal: 50,
        completed: false,
        reps: 12 
    },
    { 
        name: 'Gazpacho', 
        type: 'Dinner', 
        imageurl: 'https://img.freepik.com/free-photo/minced-lula-kebab-grilled-turkey-chicken-with-fresh-vegetables-top-view_2829-19979.jpg?w=1480&t=st=1704788956~exp=1704789556~hmac=d01d3686bed82108c7f37c7fdba69437a1ce08e020f5686609ed8a9a1bfe7177',
        cal: 50,
        completed: false,
        reps: 12 
    },
    { 
        name: 'Pho', 
        type: 'Dinner', 
        imageurl: 'https://img.freepik.com/free-photo/dietary-salad-with-mussels-quail-eggs-cucumbers-radish-lettuce-healthy-food-seafood-salad-top-view-flat-lay_2829-6491.jpg?w=1480&t=st=1704788959~exp=1704789559~hmac=c5f56324f7e3b1c15d7f7417efbd8a124c5d595e41f2d755b91173f9c1c6f931', 
        cal: 30,
        completed: false,
        reps: 10
    },

    { 
        type: 'Shoulder', 
        name: 'Shoulder Press', 
        imageurl: 'https://img.freepik.com/free-photo/minced-lula-kebab-grilled-turkey-chicken-with-fresh-vegetables-top-view_2829-19981.jpg?w=1480&t=st=1704788908~exp=1704789508~hmac=2cf014447b48bdef0259bde3b00bd4e462fabc34c5c24353e2acb2e47b269cf8', 
        cal: 30,
        completed: false,
        reps: 10
    },
    { 
        type: 'Shoulder', 
        name: 'Front Raise', 
        imageurl: 'https://img.freepik.com/free-photo/friied-eggs-with-vegetables_2829-10925.jpg?w=1480&t=st=1704788912~exp=1704789512~hmac=b6e07f3e5d5299e6a416e61df901f0d419cd87d6c11db71c9ad4e607bd2f4c87', 
        cal: 30,
        completed: false,
        reps: 12 
    },
    { 
        type: 'Shoulder', 
        name: 'Lateral Raise', 
        imageurl: 'https://img.freepik.com/free-vector/shoulder-lateral-raise-demostration_1133-375.jpg?size=626&ext=jpg&ga=GA1.1.2019684223.1704558004', 
        cal: 40,
        completed: false,
        reps: 12 
    },

    { 
        type: 'Bicep', 
        name: 'Dumbbell Curl', 
        imageurl: 'https://img.freepik.com/free-vector/dumbbell-curl-demostration_1133-363.jpg?size=626&ext=jpg&ga=GA1.1.2019684223.1704558004', 
        cal: 40,
        completed: false,
        reps: 10
    },
    { 
        type: 'Bicep', 
        name: 'Concentration Curl', 
        imageurl: 'https://img.freepik.com/free-vector/concentrational-curl-demostration_1133-356.jpg?size=626&ext=jpg&ga=GA1.1.2019684223.1704558004', 
        cal: 40,
        completed: false,
        reps: 12 
    },
    { 
        type: 'Bicep', 
        name: 'Barbell Curl', 
        imageurl: 'https://img.freepik.com/free-vector/barbell-curl-demostration_1133-377.jpg?size=626&ext=jpg&ga=GA1.1.2019684223.1704558004', 
        cal: 100,
        completed: false,
        reps: 10
    },
    { 
        type: 'Bicep', 
        name: 'Hammer Curl', 
        imageurl: 'https://img.freepik.com/free-vector/hammer-curl-demostration_1133-371.jpg?size=626&ext=jpg&ga=GA1.1.2019684223.1704558004', 
        cal: 100,
        completed: false,
        reps: 12 
    },
    { 
        type: 'Bicep', 
        name: 'Preacher Curl', 
        imageurl: 'https://img.freepik.com/free-vector/preacher-curl-demostration_1133-391.jpg?size=626&ext=jpg&ga=GA1.1.2019684223.1704558004', 
        cal: 100,
        completed: false,
        reps: 10
    }
];

export default healthyFoodsList