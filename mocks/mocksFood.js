const mockRestaurant = {
  id: "1",
  name: "Sir John Cunt",
  description: "some bullshit",
  photos: [{ url: "http://test.jpg" }, { url: "http://test2.jpg" }],
  tables: [{ number: "1" }],
  products: [
    {
      category: "food",
      products: [
        {
          name: "Soup of the Day (Check Specials Board)",
          description: "",
          price: "5.95",
          photos: [
            {
              url:
                "https://nutritiouslife.com/wp-content/uploads/2012/03/homemade-chicken-soup.jpg"
            }
          ]
        },
        {
          name: "Bruschetta",
          description:
            "(Contains G, N, MK, E) Topped with Buffalo Mozzarella, Sun-Dried Tomato & Basil Pesto",
          price: "6.95",
          photos: [
            {
              url:
                "http://www.italianfoodforever.com/wp-content/uploads/2008/05/bruschettatomaoes1.jpg"
            }
          ]
        },
        {
          name: "Chicken Wings",
          description:
            "(Contains MK, CY) Hot ‘n’ Spicy wings, celery spear, blue cheese & garlic dip",
          price: "8.95 ",
          photos: [
            {
              url:
                "http://truffle-assets.imgix.net/c868f45b-rc309-megan-spicychickenwings-dishland2.jpg?w=600&fl=progressive&auto=format,compress&cs=tinysrgb&dpr=1"
            }
          ]
        },
        {
          name: "Baby Ribs",
          description:
            "(Contains MK, S, SP) Slow cooked pork ribs glazed with BBQ sauce and served with chargrilled corn on the cob",
          price: "9.95",
          photos: [
            {
              url:
                "https://foodchannelcom.files.wordpress.com/2018/04/honey-pecan-baby-back-ribs.jpg?crop=0px%2C95px%2C4242px%2C2544px&resize=1000%2C600"
            }
          ]
        },
        {
          name: "Feta Cheese Salad",
          description:
            "(Contains MK, N) Dressed leaves, Cherry tomatoes, Beetroot & Walnuts topped with Feta Cheese",
          price: "6.95",
          photos: [
            {
              url:
                "https://dmi4pvc5gbhhd.cloudfront.net/2010/06/scaled500x332.DSC_0021.JPG"
            }
          ]
        },
        {
          name: "Prawn Pil Pil",
          description:
            "(Contains MK, G, C) Sauté Dublin bay prawns in a hot chilli & garlic oil, sourdough bread",
          price: "12.95",
          photos: [
            {
              url:
                "https://truffle-assets.imgix.net/dkkdgt98uadb_49IpN8NUM0EsCMiCgeAMmu_Gambas-pilpil_landscapeThumbnail_en-UK.jpeg"
            }
          ]
        },
        {
          name: "Black Pudding Salad",
          description:
            "(Contains G, E) Tom’s finest black pudding tossed on the pan with bacon, sauté potato & topped with poached egg, tossed leaves & balsamic glaze",
          price: "8.95",
          photos: [
            {
              url:
                "https://supervalu.ie/thumbnail/720x400/var/files/good-food-karma/recipe/black-pudding-apple-salad-recipe.jpg?fill=1"
            }
          ]
        },
        {
          name: "Nachos",
          description:
            "(Contains G, MK) Chilli beef nachos, tortilla chips, sour cream & salsa OR Veggies with mix courgette, peppers & onion in a tomato sauce with melting cheese",
          price: "8.95",
          photos: [
            {
              url:
                "https://img.taste.com.au/mtWKdko8/w720-h480-cfill-q80/taste/2017/01/quick-and-easy-nachos-with-whipped-feta_1980x1320-120228-1.jpg"
            }
          ]
        },
        {
          name: "Fish Cakes",
          description:
            "(Contains G, MK, C, E, SS, N) Fresh cod, salmon & crab meat in a sesame crumb, chilli, coriander & lime mayonnaise, Rocket & pesto dressing",
          price: "8.95",
          photos: [
            {
              url:
                "https://realfood.tesco.com/media/images/Crumbs-fish-cakes-LGH-fcaef352-482f-4fb4-ada0-90549a290b47-0-1400x919.jpg"
            }
          ]
        },
        {
          name: "Stocky's Sharing Plate",
          description:
            "(Contains G, MK, CY, E, S) Chicken Wings (Your Way), Crispy Potato Skins, Chilli Beef Nachos & Smoked Applewood Wheel Wings – Choose from Hot ‘n’ Spicy, Sticky Honey Glaze or BBQ Sauce",
          price: "17.95",
          photos: [
            {
              url:
                "https://d3486jq6shjn6l.cloudfront.net/uploads/content_sets/3b1feda8-e85c-11e6-b098-06e1ecea57c3/Sharing_Platter_Landing_Page.jpg"
            }
          ]
        },
        {
          name: "Herb-roasted Beef Tenderloin",
          description:
            "with Bordelaise sauce served with herb roasted new potatoes and a ragout of summer squash",
          price: "17.95",
          photos: [
            {
              url:
                "http://d2droglu4qf8st.cloudfront.net/2015/08/231027/Garden-Herb-Steak_ExtraLarge1000_ID-1122950.jpg?v=1122950"
            }
          ]
        },
        {
          name: "Chicken Cordon Bleu",
          description:
            "with tasso ham and fontina cheese served with a potato gratin and mustard cream sauce",
          price: "9.00",
          photos: [
            {
              url:
                "https://images-gmi-pmc.edge-generalmills.com/26807741-9624-4591-b290-bf42ab99222d.jpg"
            }
          ]
        },
        {
          name: "Veal Parmesan",
          description: "with fettucine and marinara sauce",
          price: "12.00",
          photos: [
            {
              url:
                "https://cdn.cpnscdn.com/static.coupons.com/ext/kitchme/images/recipes/600x400/veal-parmesan_1214.jpg"
            }
          ]
        },
        {
          name: "Kansas City BBQ glazed Meatloaf",
          description: " with twice-baked potatoes and ratatouille",
          price: "14.00",
          photos: [
            {
              url:
                "https://images.media-allrecipes.com/userphotos/560x315/1127830.jpg"
            }
          ]
        },
        {
          name: "Pork Tenderloin",
          description:
            "stuffed with red pepper, spinach and goat cheese served with sweet potatoes and braised red cabbage",
          price: "19.00",
          photos: [
            {
              url:
                "https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18143846/013088026_01-main.jpg"
            }
          ]
        },
        {
          name: "Coq au Vin a la Bourguignonne",
          description:
            "Sauteed Chicken in a red wine sauce with bacon, mushrooms, pearl onions served with roasted garlic potato puree",
          price: "16.00",
          photos: [
            {
              url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNcQ6b9btwGFqQAaoQZdtPwX1t9IxnvcuuuKHbazf8ET4vM8k"
            }
          ]
        },
        {
          name: "Herb-basted Chicken Breast with Chasseur sauce",
          description: "served with glazed potatoes and a vegetable ragout",
          price: "15.00",
          photos: [{ url: "" }]
        },
        {
          name: "Curried Chicken",
          description:
            "with sauteed onions and diced tomatoes served with coconut rice",
          price: "15.00",
          photos: [
            {
              url:
                "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f00c3d421aaf38dc26de8ca23809d7de&auto=format&fit=crop&w=500&q=60"
            }
          ]
        },
        {
          name: "Pan-seared Sea Scallops and Shrimp",
          description: "served with creamed corn and fresh tomatoes",
          price: "13.00",
          photos: [
            {
              url:
                "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=67dd293566484d29e6f64d70246210c8&auto=format&fit=crop&w=500&q=60"
            }
          ]
        },
        {
          name: "Honey, soy-glazed Salmon Filet",
          description: " with creamed leeks and mushrooms",
          price: "18.00",
          photos: [
            {
              url:
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=190067166ef6ae574ca9104c98f1f0c2&auto=format&fit=crop&w=500&q=60"
            }
          ]
        },
        {
          name: "Red Snapper Filet",
          description:
            "basted with herbs and a lemon cream sauce served with roasted potatoes and a summer squash gratin",
          price: "17.00",
          photos: [
            {
              url:
                "https://img.taste.com.au/V6bVCU4r/taste/2016/11/blackened-lime-snapper-with-white-bean-tabbouleh-8083-1.jpeg"
            }
          ]
        },
        {
          name: "Pad Thai with Chicken and Shrimp",
          description:
            "Pad Thai with Chicken and Shrimp -- served with egg rolls and sweet red pepper dipping sauce",
          price: "12.00",
          photos: [
            {
              url:
                "https://assets.marthastewart.com/styles/wmax-750/d24/shrimp-pad-thai-mhlb2048/shrimp-pad-thai-mhlb2048_horiz.jpg?itok=iANkDMpf"
            }
          ]
        },
        {
          name: "Crawfish Etouffee",
          description: "with fragrant basmati rice",
          price: "20.00",
          photos: [
            {
              url:
                "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/crawfish-etouffee-sl.jpg?itok=JdSPKjiT"
            }
          ]
        },
        {
          name: "Spinach Vegetable Lasagna",
          description: "with marinara sauce and classic caesar salad",
          price: "8.00",
          photos: [
            {
              url:
                "https://img.taste.com.au/T2ZPkD17/taste/2016/11/pumpkin-spinach-and-lentil-lasagne-96693-1.jpeg"
            }
          ]
        },

        {
          name: "Chocolate Fudge Cake",
          description:
            "With Belgian chocolate sauce, real dairy ice cream, salted caramel crunch pearls and chocolate fudge pieces",
          price: "12.00",
          photos: [
            {
              url:
                "https://images.unsplash.com/photo-1505253599537-305b179737ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a6cdaa1efa647008c6e706da3a07000&auto=format&fit=crop&w=500&q=60"
            }
          ]
        },
        {
          name: "Cherry Pie",
          description:
            "Dark sweet cherry pie, dusted with demerara sugar, served hot with your choice of real dairy ice cream, custard or fluffy cream",
          price: "6.00",
          photos: [
            {
              url:
                "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/48/61/picqmaCts.jpg"
            }
          ]
        },
        {
          name: "Caramel Biscuit Cheesecake",
          description:
            "Baked New York style cheesecake with a buttery biscuit base, served with toffee fudge sauce, chocolate fudge pieces and fluffy cream",
          price: "18.00",
          photos: [
            {
              url:
                "https://truffle-assets.imgix.net/dkkdgt98uadb_3Rp3MpMNWEkQoCcOY6QUCE_nobakejaffa-cheesecake_landscapeThumbnail_en-UK.jpeg"
            }
          ]
        },
        {
          name: "Lemon Meringue Pie",
          description:
            "With raspberries in sauce, real dairy ice cream and a white chocolate and raspberry shard",
          price: "16.00",
          photos: [
            {
              url:
                "https://avocadopesto.com/wp-content/uploads/2013/07/deconstructed-lemon-meringue-4-1-of-1.jpg"
            }
          ]
        },
        {
          name: "Coconut and Black Cherry Rice Pudding",
          description:
            "Slowly cooked in coconut milk, served with raspberries in sauce",
          price: "9.00",
          photos: [
            {
              url:
                "https://www.pressurecookingtoday.com/wp-content/uploads/2014/02/Forbidden-Black-Rice-Pudding-2-Pressure-Cooking-Today.jpg"
            }
          ]
        },
        {
          name: "Treacle Sponge",
          description:
            "A fluffy sponge with lots of sticky treacle, and your choice of real dairy ice cream, custard or fluffy cream",
          price: "7.00",
          photos: [
            {
              url:
                "https://www.deliaonline.com/sites/default/files/quick_media/puddings-steamed-treacle-sponge-pudding.jpg"
            }
          ]
        },
        {
          name: "Belgian Chocolate Brownie",
          description:
            "The perfect brownie, with a raspberry & white chocolate shard and real dairy ice cream",
          price: "7.00",
          photos: [
            {
              url:
                "https://media-cdn.tripadvisor.com/media/photo-s/12/2a/37/1c/belgian-chocolate-brownie.jpg"
            }
          ]
        }
      ]
    },
    {
      category: "drinks",
      products: {
        softDrinks: [
          {
            name: "Coke",
            price: "1.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Coke Zero",
            price: "5.001.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Fanta",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Lemonade",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Ginger Ale",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Tonic",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Soda",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Mineral Water",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          }
        ],
        Beers: [
          {
            name: "Castle",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Amstel",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Windhoek Light",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Windhoek Lager",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          },
          {
            name: "Savannah",
            price: "5.00",
            photos: [
              {
                url:
                  "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
              }
            ]
          }
        ],
        Spirits: {
          Whiskey: [
            {
              name: "Bells",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "J&B",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ],
          Brandy: [
            {
              name: "Klipdrift",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "Wellington",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ],
          Gin: [
            {
              name: "Gordons",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "Tanqueray",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ],
          Vodka: [
            {
              name: "Smirnoff",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "Absolut",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ],
          Rum: [
            {
              name: "Sailor Jerry",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "Havana club",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "Ron Zapata",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ]
        },
        Wines: {
          red: [
            {
              name: "red one",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "red two",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "red three",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ],
          white: [
            {
              name: "white one",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "white two",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "white three",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ],
          rose: [
            {
              name: "rose one",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "rose two",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            },
            {
              name: "rose three",
              price: "5.00",
              photos: [
                {
                  url:
                    "https://media.gq.com/photos/56eb1c3f1740841549748e55/master/w_1600/david-beckham-gq-0416-2.jpg"
                }
              ]
            }
          ]
        }
      }
    }
  ]
};
