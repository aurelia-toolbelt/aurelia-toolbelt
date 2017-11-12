import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page2 {
    public title: string;


    private filter: string;
    private names: Array<string>;

    private books: Array<any>;
    private options: any;

    constructor(public router: Router) {
        this.names = ['Vegar', 'Saeed', 'Hamed'];

        this.options = {
            shouldSort: true,
            includeMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 3,
            keys: [
                'title',
                'author.firstName'
            ]
        };

        this.books = [
            {
                title: "Old Man's War",
                author: {
                    firstName: 'John',
                    lastName: 'Scalzi'
                }
            },
            {
                title: 'The Lock Artist',
                author: {
                    firstName: 'Steve',
                    lastName: 'Hamilton'
                }
            },
            {
                title: 'HTML5',
                author: {
                    firstName: 'Remy',
                    lastName: 'Sharp'
                }
            },
            {
                title: 'Right Ho Jeeves',
                author: {
                    firstName: 'P.D',
                    lastName: 'Woodhouse'
                }
            },
            {
                title: 'The Code of the Wooster',
                author: {
                    firstName: 'P.D',
                    lastName: 'Woodhouse'
                }
            },
            {
                title: 'Thank You Jeeves',
                author: {
                    firstName: 'P.D',
                    lastName: 'Woodhouse'
                }
            },
            {
                title: 'The DaVinci Code',
                author: {
                    firstName: 'Dan',
                    lastName: 'Brown'
                }
            },
            {
                title: 'Angels & Demons',
                author: {
                    firstName: 'Dan',
                    lastName: 'Brown'
                }
            },
            {
                title: 'The Silmarillion',
                author: {
                    firstName: 'J.R.R',
                    lastName: 'Tolkien'
                }
            },
            {
                title: 'Syrup',
                author: {
                    firstName: 'Max',
                    lastName: 'Barry'
                }
            },
            {
                title: 'The Lost Symbol',
                author: {
                    firstName: 'Dan',
                    lastName: 'Brown'
                }
            },
            {
                title: 'The Book of Lies',
                author: {
                    firstName: 'Brad',
                    lastName: 'Meltzer'
                }
            },
            {
                title: 'Lamb',
                author: {
                    firstName: 'Christopher',
                    lastName: 'Moore'
                }
            },
            {
                title: 'Fool',
                author: {
                    firstName: 'Christopher',
                    lastName: 'Moore'
                }
            },
            {
                title: 'Incompetence',
                author: {
                    firstName: 'Rob',
                    lastName: 'Grant'
                }
            },
            {
                title: 'Fat',
                author: {
                    firstName: 'Rob',
                    lastName: 'Grant'
                }
            },
            {
                title: 'Colony',
                author: {
                    firstName: 'Rob',
                    lastName: 'Grant'
                }
            },
            {
                title: 'Backwards, Red Dwarf',
                author: {
                    firstName: 'Rob',
                    lastName: 'Grant'
                }
            },
            {
                title: 'The Grand Design',
                author: {
                    firstName: 'Stephen',
                    lastName: 'Hawking'
                }
            },
            {
                title: 'The Book of Samson',
                author: {
                    firstName: 'David',
                    lastName: 'Maine'
                }
            },
            {
                title: 'The Preservationist',
                author: {
                    firstName: 'David',
                    lastName: 'Maine'
                }
            },
            {
                title: 'Fallen',
                author: {
                    firstName: 'David',
                    lastName: 'Maine'
                }
            },
            {
                title: 'Monster 1959',
                author: {
                    firstName: 'David',
                    lastName: 'Maine'
                }
            }
        ];

    }

    public canActivate(a, b, c) {
        this.title = b.title;
    }

}
