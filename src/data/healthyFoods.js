var healthyFoodsList = [
    {
        // type: 'Non Veg',
        name: 'Seafood Medley Salad with Quail Eggs',
        imageurl: 'https://img.freepik.com/free-photo/dietary-salad-with-mussels-quail-eggs-cucumbers-radish-lettuce-healthy-food-seafood-salad-top-view-flat-lay_2829-6491.jpg?w=1480&t=st=1704822675~exp=1704823275~hmac=a1f34fa4f0883e1229f8126f82c6e73afccb8973f176ef51a9b13153260ea4a5',
        cal: 220,
        completed: false,
        reps: 300
    },
    { 
        // type: 'Chest', 
        name: 'Chicken Quinoa Delight', 
        imageurl: 'https://img.freepik.com/free-photo/baked-meatballs-chicken-fillet-with-garnish-with-quinoa-boiled-broccoli-proper-nutrition-sports-nutrition-dietary-menu-top-view_2829-20087.jpg?w=1480&t=st=1704820365~exp=1704820965~hmac=cb21de7c79c50770d68b10b3f648887a090906328e831cdc01db412631cbac2f',
        cal: 425,
        completed: false,
        reps: 100 
    },
    { 
        // type: 'Non Veg', 
        name: 'Minced Lula Kebab (Ground Turkey)', 
        imageurl: 'https://img.freepik.com/free-photo/minced-lula-kebab-grilled-turkey-chicken-with-fresh-vegetables-top-view_2829-19983.jpg?w=1480&t=st=1704820301~exp=1704820901~hmac=6a4424fd93d750283d0767c2877ecbb0067616ac85597d363c5787dbc7193aa7',
        cal: 300,
        completed: false,
        reps: 200 
    },
    { 
        // type: 'Grilled Chicken Drumstick', 
        name: 'Grilled Chicken Drumstick', 
        imageurl: 'https://img.freepik.com/free-photo/top-view-mix-steaks-with-potatoes-vegetable-salad-sauce_141793-4089.jpg?w=1480&t=st=1704821243~exp=1704821843~hmac=95db4ec0f428eda0db8132571d244beaae16bd4fbbe3c7a03caf0c12b91a5e82', 
        cal: 800,
        completed: false,
        reps: 12 
    },
    { 
        // type: 'Chest', 
        name: 'Boneless Fried Meat', 
        imageurl: 'https://img.freepik.com/free-photo/boneless-fried-meat-wooden-board_140725-7496.jpg?w=1380&t=st=1704822358~exp=1704822958~hmac=924b453d08a0def259234c27c33ce7e99ac065cc42fd8dacad2409f9e5059e53',
        cal: 1000,
        completed: false,
        reps: 600 
    },
    { 
        // type: 'Chest', 
        name: 'Grilled Chicken', 
        imageurl: 'https://img.freepik.com/free-photo/grilled-chicken-plate-with-sticky-rice_1150-24368.jpg?w=1480&t=st=1704821834~exp=1704822434~hmac=8ad9b7ad2332e544f4c8e8ef565f759f2d779330869708cd2c6b068f770c2af8', 
        cal: 900,
        completed: false,
        reps: 500
    },

    { 
        type: 'Shoulder', 
        name: 'Shoulder Press', 
        imageurl: 'https://img.freepik.com/free-photo/minced-lula-kebab-grilled-turkey-chicken-with-fresh-vegetables-top-view_2829-19981.jpg?w=1480&t=st=1704788908~exp=1704789508~hmac=2cf014447b48bdef0259bde3b00bd4e462fabc34c5c24353e2acb2e47b269cf8', 
        cal: 1800,
        completed: false,
        reps: 1200
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