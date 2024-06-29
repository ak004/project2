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
      }
]




var catagores = [
    // {
    //     _id: '656ee679400fff4fbecd45d6',
    //     title: 'Design',
    //     discription: 'design',
    //     status: 2,
    //     image: 'images/VXbXtDMRAThBW6kb5wfwBUyEnlzxR.jpg',
    //     __v: 0
    //   },
    //   {
    //     _id: '656ee757400fff4fbecd45e9',
    //     title: 'Programing',
    //     discription: 'programming',
    //     status: 2,
    //     image: 'images/G9YIsiaTGEcKS5o9ITNezEIyCmnQ0.jpg',
    //     __v: 0
    //   }
]



var modules = [
    // {
    //     _id: '656ee6bf400fff4fbecd45db',
    //     title: 'design a mobile app in Figma',
    //     discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget elit iaculis, ultricies velit ut, varius orci. Proin et molestie felis. Etiam interdum nunc urna, non fermentum est tincidunt in. Proin finibus, nulla nec cursus faucibus, ex est lobortis erat, non rhoncus ipsum diam eget sapien. Donec id est at augue fermentum varius eu vitae lacus. Nullam ornare eu nisi nec tincidunt. Pellentesque iaculis rutrum rhoncus. Nam finibus dolor quam, id varius ipsum tempus vitae.',
    //     notes: '',
    //     duration: '3:32',
    //     no_of_vids: 0,
    //     price: 12,
    //     likes: 0,
    //     user_id: '656ede0b7e2b4c179b9181ae',
    //     catagory_id: '656ee679400fff4fbecd45d6',
    //     image: 'images/GASXdMcr8qyhpqMveCgZhhSnNCx4D.jpg',
    //     status: 2,
    //     bought_users: [],
    //     __v: 0
    //   },
    //   {
    //     _id: '656ee774400fff4fbecd45ee',
    //     title: 'what is programming',
    //     discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget elit iaculis, ultricies velit ut, varius orci. Proin et molestie felis. Etiam interdum nunc urna, non fermentum est tincidunt in. Proin finibus, nulla nec cursus faucibus, ex est lobortis erat, non rhoncus ipsum diam eget sapien. Donec id est at augue fermentum varius eu vitae lacus. Nullam ornare eu nisi nec tincidunt. Pellentesque iaculis rutrum rhoncus. Nam finibus dolor quam, id varius ipsum tempus vitae.',
    //     notes: '',
    //     duration: '1:20',
    //     no_of_vids: 0,
    //     price: 5,
    //     likes: 0,
    //     user_id: '656ede0b7e2b4c179b9181ae',
    //     catagory_id: '656ee757400fff4fbecd45e9',
    //     image: 'images/Ie0meIleSQEK5kCAS0oNvtm0LUFqB.jpg',
    //     status: 2,
    //     bought_users: [],
    //     __v: 0
    //   },
    //   {
    //     _id: '657021763ad4ab791f9cdbf9',
    //     title: 'a small courese on programming ',
    //     discription: 'Suspendisse potenti. Phasellus id maximus odio. Donec pulvinar lobortis quam vitae viverra. Fusce augue elit, aliquet sed malesuada ac, sagittis sit amet velit. Ut sem arcu, ornare at leo a, dignissim pellentesque dui. Morbi feugiat vitae mauris vel elementum. Nam id suscipit erat, in mollis massa. Quisque aliquam vel augue vel efficitur. Aliquam auctor gravida porttitor. Vivamus tempor velit at ornare viverra. Praesent semper consequat egestas. Suspendisse potenti. Mauris vitae nisl justo.',
    //     notes: '',
    //     duration: '1:0',
    //     no_of_vids: 0,
    //     price: 2,
    //     likes: 0,
    //     user_id: '6570202f3ad4ab791f9cdbeb',
    //     catagory_id: '656ee757400fff4fbecd45e9',
    //     image: 'images/RhsVCafabzjD6L6Nn6jZWFu4MrCvP.jpg',
    //     status: 2,
    //     bought_users: [],
    //     __v: 0
    //   }
]


var vidoes = [
    // {
    //     _id: '657011b029232711eb4456ef',
    //     title: 'video one',
    //     discription: 'Suspendisse potenti. Phasellus id maximus odio. Donec pulvinar lobortis quam vitae viverra. Fusce augue elit, aliquet sed malesuada ac, sagittis sit amet velit. Ut sem arcu, ornare at leo a, dignissim pellentesque dui. Morbi feugiat vitae mauris vel elementum. Nam id suscipit erat, in mollis massa. Quisque aliquam vel augue vel efficitur. Aliquam auctor gravida porttitor. Vivamus tempor velit at ornare viverra. Praesent semper consequat egestas. Suspendisse potenti. Mauris vitae nisl justo.',
    //     duration: null,
    //     thumb_img: 'images/nTFdBf6HWQsKvrObfTQIziNI3kIV3.jpg',
    //     user_id: '656ede0b7e2b4c179b9181ae',
    //     module_id: '656ee6bf400fff4fbecd45db',
    //     status: 2,
    //     path: 'vids/1697116505417_Coronavirus+disease+(COVID-19).mp4',
    //     attachments: [ 'attachments/nFw6ePqjKG1kEOd8dOUBdB1AiYdqS.pdf' ],
    //     __v: 0,
    //     pah: 'vids/1697116555369_Cyber Security In 7 Minutes _ What Is Cyber Security_ How It Works_ _ Cyber Security _ Simplilearn.mp4'
    //   },
    //   {
    //     _id: '657021a53ad4ab791f9cdbff',
    //     title: 'programming tips',
    //     discription: 'Suspendisse potenti. Phasellus id maximus odio. Donec pulvinar lobortis quam vitae viverra. Fusce augue elit, aliquet sed malesuada ac, sagittis sit amet velit. Ut sem arcu, ornare at leo a, dignissim pellentesque dui. Morbi feugiat vitae mauris vel elementum. Nam id suscipit erat, in mollis massa. Quisque aliquam vel augue vel efficitur. Aliquam auctor gravida porttitor. Vivamus tempor velit at ornare viverra. Praesent semper consequat egestas. Suspendisse potenti. Mauris vitae nisl justo.',
    //     duration: null,
    //     thumb_img: 'images/k7bABzpWlovtGLgSGPYmwtGL5UDyA.jpg',
    //     user_id: '6570202f3ad4ab791f9cdbeb',
    //     module_id: '657021763ad4ab791f9cdbf9',
    //     status: 2,
    //     path: 'vids/1691343461576_MySQL_Node.js_Express.mp4',
    //     attachments: [],
    //     __v: 0
    //   }
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



 