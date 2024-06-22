var  def_menu = [
    {
        _id: '656edfca7e2b4c179b9181ba',
        name: 'Setting',
        icon: 'M 12,2 A 10,10 0 1,1 2,12 A 10,10 0 1,1 12,22 A 10,10 0 1,1 22,12 A 10,10 0 1,1 12,2 M 6,12 V 2 M 12,2 V 12 M 18,12 V 2 M 4.93,4.93 L 7.76,7.76 M 16.24,16.24 L 19.07,19.07 M 2,12 H 4 M 20,12 H 22 M 4.93,19.07 L 7.76,16.24 M 16.24,7.76 L 19.07,4.93',
        status: 2, 
        __v: 0
      },
      {
        _id: '656edfd77e2b4c179b9181bd',
        name: 'Tutoring',
        icon: 'M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z',
        status: 2,
        __v: 0
      },
      {
        _id : "6607b3dd9bc211bde0390703",
        name : "Resources",
        icon : "M23.992 11.806a5.091 5.091 0 0 0-.018-.279v-.002-.002a5.98 5.98 0 0 0-.99-2.814 6.217 6.217 0 0 0-.867-1.039 6.289 6.289 0 0 0-1.64-1.13 7.016 7.016 0 0 0-3.051-.668 7.35 7.35 0 0 0-2.546.444 6.323 6.323 0 0 0-1.822.996 6.45 6.45 0 0 0-.333.29l-.085.085-.117.125h.001l-.056.055-.026.028-.141.147c-.104.117-.202.234-.296.349v-.002l-.004-.003c-.192.233-.37.476-.5.693-.089.14-.176.283-.259.427l-1.147 2.319.002.001-.06.118-.126.256c-.251.509-.521 1.017-.821 1.435-.672.737-1.431 1.098-2.406 1.098-.068 0-.139-.003-.209-.008-.588-.023-1.092-.162-1.539-.427a2.576 2.576 0 0 1-.994-1.03 2.659 2.659 0 0 1-.326-1.369l.002-.034c.031-.76.321-1.352.904-1.861.142-.124.291-.228.446-.32.021-.013.044-.024.065-.036.434-.237.927-.355 1.492-.355l.176.005c.899.034 1.592.314 2.145.863l1.734-3.113a6.845 6.845 0 0 0-1.399-.71c-.019-.007-.04-.016-.06-.022-.062-.022-.123-.045-.186-.065a7.425 7.425 0 0 0-1.716-.348 5.545 5.545 0 0 1-.046-.006c-.091-.005-.184-.016-.275-.02a9.966 9.966 0 0 0-.297-.007h-.055a7.005 7.005 0 0 0-3.028.67 6.176 6.176 0 0 0-2.502 2.166A6.006 6.006 0 0 0 0 12.087c-.002 1.564.568 2.938 1.701 4.093 1.184 1.211 2.721 1.864 4.567 1.941.118.005.235.008.353.008 1.045 0 2.011-.186 2.878-.558.217-.093.427-.201.642-.322.117-.067.228-.139.338-.215l.08-.055.137-.093c.164-.118.317-.246.467-.381l.052-.05c.088-.083.176-.168.259-.255l.311-.352.118-.148.056-.081.055-.079c.462-.776 1.965-3.601 1.965-3.601v-.006l.09-.172.074-.135c.222-.403.382-.689.594-.99l.006-.01c.493-.717 1.344-1.227 2.346-1.313 1.68-.145 3.152.959 3.287 2.465.135 1.507-1.117 2.846-2.798 2.991a3.417 3.417 0 0 1-1.011-.064l-.009.003c-1.232-.257-2.017-1.155-2.404-1.558l-1.617 2.974s.503.506.847.759c.346.253.791.501 1.146.656a7.151 7.151 0 0 0 2.838.589c.121 0 .097 0 .222-.005 1.844-.077 3.489-.784 4.675-1.995 1.123-1.15 1.733-2.463 1.738-4.018v-.047l-.011-.257z",
        status : 2,
        __v : 0
    }
]


var pages = [
    {
        _id: '656ee513400fff4fbecd45b6',
        name: 'Pages',
        icon: 'fa-fa-file',
        url: '/pages',
        menu_id: '656edfca7e2b4c179b9181ba',
        menu_name: 'Setting',
        status: 2,
        __v: 0
      },
      {
        _id: '656ee52e400fff4fbecd45bb',
        name: 'Modules',
        icon: 'fa-fa-file',
        url: '/modules',
        menu_id: '656edfd77e2b4c179b9181bd',
        menu_name: 'Tutoring',
        status: 2,
        __v: 0
      },
      {
        _id: '656ee53b400fff4fbecd45c0',
        name: 'Upload video',
        icon: 'fa fa-menu',
        url: '/upload_videos',
        menu_id: '656edfd77e2b4c179b9181bd',
        menu_name: 'Tutoring',
        status: 2,
        __v: 0
      },
      {
        _id: '656ee5f0400fff4fbecd45cd',
        name: 'catagoies',
        icon: 'fa-fa-file',
        url: '/catagories',
        menu_id: '656edfca7e2b4c179b9181ba',
        menu_name: 'Setting',
        status: 2,
        __v: 0
      },
      {
        _id: '657034fa3ad4ab791f9cdc60',
        name: 'Menu',
        icon: 'fa-fa-file',
        url: '/menu',
        menu_id: '656edfca7e2b4c179b9181ba',
        menu_name: 'Setting',
        status: 2,
        __v: 0
      },
      {
        _id : "660a7bcf2d1bb60eccf28669",
        name : "Resources",
        icon : "no icon for now",
        url : "/resources",
        menu_id : "6607b3dd9bc211bde0390703",
        menu_name : "Resources",
        status : 2,
        created_at : "2024-04-01T09:18:07.207Z",
        __v : 0
    }
]




var catagores = [
    {
        _id: '656ee679400fff4fbecd45d6',
        title: 'Design',
        discription: 'design',
        status: 2,
        image: 'images/VXbXtDMRAThBW6kb5wfwBUyEnlzxR.jpg',
        __v: 0
      },
      {
        _id: '656ee757400fff4fbecd45e9',
        title: 'Programing',
        discription: 'programming',
        status: 2,
        image: 'images/G9YIsiaTGEcKS5o9ITNezEIyCmnQ0.jpg',
        __v: 0
      }
]



var modules = [
    {
        _id: '656ee6bf400fff4fbecd45db',
        title: 'design a mobile app in Figma',
        discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget elit iaculis, ultricies velit ut, varius orci. Proin et molestie felis. Etiam interdum nunc urna, non fermentum est tincidunt in. Proin finibus, nulla nec cursus faucibus, ex est lobortis erat, non rhoncus ipsum diam eget sapien. Donec id est at augue fermentum varius eu vitae lacus. Nullam ornare eu nisi nec tincidunt. Pellentesque iaculis rutrum rhoncus. Nam finibus dolor quam, id varius ipsum tempus vitae.',
        notes: '',
        duration: '3:32',
        no_of_vids: 0,
        price: 12,
        likes: 0,
        user_id: '656ede0b7e2b4c179b9181ae',
        catagory_id: '656ee679400fff4fbecd45d6',
        image: 'images/GASXdMcr8qyhpqMveCgZhhSnNCx4D.jpg',
        status: 2,
        bought_users: [],
        __v: 0
      },
      {
        _id: '656ee774400fff4fbecd45ee',
        title: 'what is programming',
        discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget elit iaculis, ultricies velit ut, varius orci. Proin et molestie felis. Etiam interdum nunc urna, non fermentum est tincidunt in. Proin finibus, nulla nec cursus faucibus, ex est lobortis erat, non rhoncus ipsum diam eget sapien. Donec id est at augue fermentum varius eu vitae lacus. Nullam ornare eu nisi nec tincidunt. Pellentesque iaculis rutrum rhoncus. Nam finibus dolor quam, id varius ipsum tempus vitae.',
        notes: '',
        duration: '1:20',
        no_of_vids: 0,
        price: 5,
        likes: 0,
        user_id: '656ede0b7e2b4c179b9181ae',
        catagory_id: '656ee757400fff4fbecd45e9',
        image: 'images/Ie0meIleSQEK5kCAS0oNvtm0LUFqB.jpg',
        status: 2,
        bought_users: [],
        __v: 0
      },
      {
        _id: '657021763ad4ab791f9cdbf9',
        title: 'a small courese on programming ',
        discription: 'Suspendisse potenti. Phasellus id maximus odio. Donec pulvinar lobortis quam vitae viverra. Fusce augue elit, aliquet sed malesuada ac, sagittis sit amet velit. Ut sem arcu, ornare at leo a, dignissim pellentesque dui. Morbi feugiat vitae mauris vel elementum. Nam id suscipit erat, in mollis massa. Quisque aliquam vel augue vel efficitur. Aliquam auctor gravida porttitor. Vivamus tempor velit at ornare viverra. Praesent semper consequat egestas. Suspendisse potenti. Mauris vitae nisl justo.',
        notes: '',
        duration: '1:0',
        no_of_vids: 0,
        price: 2,
        likes: 0,
        user_id: '6570202f3ad4ab791f9cdbeb',
        catagory_id: '656ee757400fff4fbecd45e9',
        image: 'images/RhsVCafabzjD6L6Nn6jZWFu4MrCvP.jpg',
        status: 2,
        bought_users: [],
        __v: 0
      }
]


var vidoes = [
    {
        _id: '657011b029232711eb4456ef',
        title: 'video one',
        discription: 'Suspendisse potenti. Phasellus id maximus odio. Donec pulvinar lobortis quam vitae viverra. Fusce augue elit, aliquet sed malesuada ac, sagittis sit amet velit. Ut sem arcu, ornare at leo a, dignissim pellentesque dui. Morbi feugiat vitae mauris vel elementum. Nam id suscipit erat, in mollis massa. Quisque aliquam vel augue vel efficitur. Aliquam auctor gravida porttitor. Vivamus tempor velit at ornare viverra. Praesent semper consequat egestas. Suspendisse potenti. Mauris vitae nisl justo.',
        duration: null,
        thumb_img: 'images/nTFdBf6HWQsKvrObfTQIziNI3kIV3.jpg',
        user_id: '656ede0b7e2b4c179b9181ae',
        module_id: '656ee6bf400fff4fbecd45db',
        status: 2,
        path: 'vids/1697116505417_Coronavirus+disease+(COVID-19).mp4',
        attachments: [ 'attachments/nFw6ePqjKG1kEOd8dOUBdB1AiYdqS.pdf' ],
        __v: 0,
        pah: 'vids/1697116555369_Cyber Security In 7 Minutes _ What Is Cyber Security_ How It Works_ _ Cyber Security _ Simplilearn.mp4'
      },
      {
        _id: '657021a53ad4ab791f9cdbff',
        title: 'programming tips',
        discription: 'Suspendisse potenti. Phasellus id maximus odio. Donec pulvinar lobortis quam vitae viverra. Fusce augue elit, aliquet sed malesuada ac, sagittis sit amet velit. Ut sem arcu, ornare at leo a, dignissim pellentesque dui. Morbi feugiat vitae mauris vel elementum. Nam id suscipit erat, in mollis massa. Quisque aliquam vel augue vel efficitur. Aliquam auctor gravida porttitor. Vivamus tempor velit at ornare viverra. Praesent semper consequat egestas. Suspendisse potenti. Mauris vitae nisl justo.',
        duration: null,
        thumb_img: 'images/k7bABzpWlovtGLgSGPYmwtGL5UDyA.jpg',
        user_id: '6570202f3ad4ab791f9cdbeb',
        module_id: '657021763ad4ab791f9cdbf9',
        status: 2,
        path: 'vids/1691343461576_MySQL_Node.js_Express.mp4',
        attachments: [],
        __v: 0
      }
]


var users = [
    {
        _id: '656ede0b7e2b4c179b9181ae',
        name: 'tim and sombody',
        last_name: '',
        city: '',
        dob: null,
        martial_status: '',
        address: '',
        email: 'tim@simad.edu.so',
        user_name: 'tim123',
        phone: '615445525',
        password: '$2a$10$3VVrU9kKlhTC.0cHEaRZd.y6T/KvJ1pzUKF7n0V90O6FN/uBYvqZS',
        status: 0,
        likes: 0,
        role: 'user',
        token: '',
        type: 0,
        __v: 0
      },
      {
        _id: '6570202f3ad4ab791f9cdbeb',
        name: 'mascud moha',
        last_name: '',
        city: '',
        dob: null,
        martial_status: '',
        address: '',
        email: 'mascud@simad.edu.so',
        user_name: 'mascud',
        phone: '615788585',
        password: '$2a$10$XHQzn4DoyjRGD7tVEaTHq.blQiAy4rTHcp3H7GdQJpEhvgGRrqdvG',
        status: 0,
        likes: 0,
        role: 'user',
        token: '',
        type: 0,
        __v: 0
      }
]


module.exports = {
    menus: def_menu,
    pages: pages,
    catagores: catagores,
    modules:modules,
    vidoes:vidoes,
    users:users
};



 