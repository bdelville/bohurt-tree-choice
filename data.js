var treeData = [
    {
        "name": "Parent",
        "text": "Alors?",
        "parent": "null",
        "children": [
            {
                "bg": "bg_bohurt.jpeg",
                "text": "Trop bon !!!!",
                "children": [
                    {
                        "text": "Need! Où ça se passe?",
                        "children": [
                            {
                                "text": "La fédé française",
                                "action": "http://www.combatmedieval.com/presentation/"
                            },
                            {
                                "text": "Pour les Belges",
                                "action": "https://www.facebook.com/Compagnie-Médiévale-Du-Dragon-328353784195/"
                            },
                            {
                                "text": "Battle of the nation",
                                "action": "http://botn.info/en-events"
                            },
                            {
                                "text": "IMCF",
                                "action": "http://medieval-combat.org"
                            }
                        ]
                    },
                    {
                        "text": "Ca coute combien?",
                        "children": [
                            {
                                "text": "Débrouillard? Moins de 1000€",
                                "action": ""
                            },
                            {
                                "text": "Ou pas? 1500€",
                                "action": ""
                            },
                            {
                                "text": "Le top? 3000€",
                                "action": ""
                            }
                        ]
                    }
                ]
            },
            {
                "type": "bof",
                "text": "Ce sont des vraies armes?",
                "children": [
                    {
                        "text": "Oui et ca coupe",
                        "children": [
                            {
                                "text": "On est pas des fous non plus"
                            }
                        ]
                    },
                    {
                        "text": "Non c'est du plastique",
                        "children": [
                            {
                                "text": "Heuuu non, ça c'est pour UWM",
                                "action": "https://www.youtube.com/watch?v=wOw6Mwl4r18"
                            }
                        ]
                    },
                    {
                        "text": "Des vraies mais émoussées",
                        "children": [
                            {
                                "text": "Il y a des blessures?",
                                "children": [
                                    {
                                        "text": "Un med disait qu'il y aura un mort",
                                        "children": [
                                            {
                                                "text": "Rien n'est sans risque, mais non",
                                                "action": ""
                                            }
                                        ]
                                    }, {
                                        "text": "Des bleus, quelques os cassés",
                                        "children": [
                                            {
                                                "text": "Une études à faire valider compare effectivement aux taux de blessures du VTT",
                                                "action": "",
                                                "children": [
                                                    {
                                                        "text": "Je peux en savoir plus?",
                                                        "action": "http://www.lemonde.fr/videos/video/2016/06/04/les-tournois-de-chevaliers-revisites-en-sport-de-combat-en-armure_4935474_1669088.html"
                                                    }
                                                ]
                                            }
                                        ]
                                    }, {
                                        "text": "Rien. Vous simulez",
                                        "action": "http://www.google.fr/search?q=football"
                                    }
                                ]

                            },
                        ]
                    }
                ]
            },
            {
                "type": "gamer",
                "text": "Bof. Moi j'joue à For Honor",
                "children": [
                    {
                        "text": "Terasser un fauchon en main...",
                        "action": ["restart", "https://scontent-syd1-1.xx.fbcdn.net/t31.0-8/11952950_708071345961133_6216540038353245710_o.jpg"],

                    },
                    {
                        "text": "ou une manette?",
                        "action": "http://media02.hongkiat.com/professional-gaming-career/prof-gamer.jpg"
                    }
                ]

            },
            {
                "type": "nul",
                "text": "T'es fou? Sort moi de là",
                "action": "http://www.google.fr/search?q=football"
            }
        ]
    }
];