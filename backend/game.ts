interface User{
    name : string,
    id : string
}
interface Card {
    name : string,
    value : number,
    color : string
}
interface userCards {
    id : string,
    cards : Card[]
}


export default class Game {
    users = [] as User[];
    deck_card = {name : "",value : 0,color : ""} as Card;
    user_cards = [] as userCards[];
    turn = 0 as number;
    uno_reverse_flag = false as boolean;
    room_number = 0 as number;
    io = undefined as any;
    num_players = 0 as any;
    deck = [{ name: 'card num-1 red', value: 1, color : "red" }, { name: 'card num-2 red', value: 2, color : "red" }, 
    { name: 'card num-3 red', value: 3, color : "red" },{ name: 'card num-5 red', value: 5,color : "red" }, { name: 'card num-6 red', value: 6, color : "red" },
    { name: 'card num-7 red', value: 7,color : "red" },{ name: 'card num-8 red', value: 8,color : "red" },  { name: 'card num-9 red', value: 9,color : "red" },
    { name: 'card num-1 red', value: 1, color : "red" }, { name: 'card num-2 red', value: 2, color : "red" }, 
    { name: 'card num-3 red', value: 3, color : "red" },{ name: 'card num-5 red', value: 5,color : "red" }, { name: 'card num-6 red', value: 6, color : "red" },
    { name: 'card num-7 red', value: 7,color : "red" },{ name: 'card num-8 red', value: 8,color : "red" },  { name: 'card num-9 red', value: 9,color : "red" },
    { name: 'card num-1 blue', value: 1, color : "blue" }, { name: 'card num-2 blue', value: 2, color : "blue" }, 
    { name: 'card num-3 blue', value: 3, color : "blue" },{ name: 'card num-5 blue', value: 5,color : "blue" }, { name: 'card num-6 blue', value: 6, color : "blue" },
    { name: 'card num-7 blue', value: 7,color : "blue" },{ name: 'card num-8 blue', value: 8,color : "blue" },  { name: 'card num-9 blue', value: 9,color : "blue" },
    { name: 'card num-1 blue', value: 1, color : "blue" }, { name: 'card num-2 blue', value: 2, color : "blue" }, 
    { name: 'card num-3 blue', value: 3, color : "blue" },{ name: 'card num-5 blue', value: 5,color : "blue" }, { name: 'card num-6 blue', value: 6, color : "blue" },
    { name: 'card num-7 blue', value: 7,color : "blue" },{ name: 'card num-8 blue', value: 8,color : "blue" },  { name: 'card num-9 blue', value: 9,color : "blue" },
    { name: 'card num-1 yellow', value: 1, color : "yellow" }, { name: 'card num-2 yellow', value: 2, color : "yellow" }, 
    { name: 'card num-3 yellow', value: 3, color : "yellow" },{ name: 'card num-5 yellow', value: 5,color : "yellow" }, { name: 'card num-6 yellow', value: 6, color : "yellow" },
    { name: 'card num-7 yellow', value: 7,color : "yellow" },{ name: 'card num-8 yellow', value: 8,color : "yellow" },  { name: 'card num-9 yellow', value: 9,color : "yellow" },
    { name: 'card num-1 yellow', value: 1, color : "yellow" }, { name: 'card num-2 yellow', value: 2, color : "yellow" }, 
    { name: 'card num-3 yellow', value: 3, color : "yellow" },{ name: 'card num-5 yellow', value: 5,color : "yellow" }, { name: 'card num-6 yellow', value: 6, color : "yellow" },
    { name: 'card num-7 yellow', value: 7,color : "yellow" },{ name: 'card num-8 yellow', value: 8,color : "yellow" },  { name: 'card num-9 yellow', value: 9,color : "yellow" },
    { name: 'card num-1 yellow', value: 1, color : "yellow" }, { name: 'card num-2 yellow', value: 2, color : "yellow" }, 
    { name: 'card num-3 green', value: 3, color : "green" },{ name: 'card num-5 green', value: 5,color : "green" }, { name: 'card num-6 green', value: 6, color : "green" },
    { name: 'card num-7 green', value: 7,color : "green" },{ name: 'card num-8 green', value: 8,color : "green" },  { name: 'card num-9 green', value: 9,color : "green" },
    { name: 'card num-1 green', value: 1, color : "green" }, { name: 'card num-2 green', value: 2, color : "green" }, 
    { name: 'card num-3 green', value: 3, color : "green" },{ name: 'card num-5 green', value: 5,color : "green" }, { name: 'card num-6 green', value: 6, color : "green" },
    { name: 'card num-7 green', value: 7,color : "green" },{ name: 'card num-8 green', value: 8,color : "green" },  
    { name: 'card num-9 green', value: 9,color : "green" }, { name: 'card skip red', value: 0,color : "red" },{ name: 'card skip red', value: 0,color : "red" }, { name: 'card skip blue', value: 0,color : "blue" },
    { name: 'card skip blue', value: 0,color : "blue" },{ name: 'card skip green', value: 0,color : "green"}, { name: 'card skip green', value: 0,color : "green" },{ name: 'card skip yellow', value: 0,color : "yellow" },
    { name: 'card skip yellow', value: 0,color : "yellow" }, { name: 'card reverse red', value: 0,color : "red" },{ name: 'card reverse red', value: 0,color : "red" }, { name: 'card reverse blue', value: 0,color : "blue" },
    { name: 'card reverse blue', value: 0,color : "blue" },{ name: 'card reverse green', value: 0,color : "green"}, { name: 'card reverse green', value: 0,color : "green" },{ name: 'card reverse yellow', value: 0,color : "yellow" },
    { name: 'card reverse yellow', value: 0,color : "yellow" },
    { name: 'card draw-two red', value: 2,color : "red" }, { name: 'card draw-4 red', value: 4,color : "red" },{ name: 'card draw-two blue', value: 2,color : "blue" }, 
    { name: 'card draw-4 blue', value: 4,color : "blue"},{ name: 'card draw-two green', value: 2,color : "green" }, { name: 'card draw-4 green', value: 4,color : "green" }, 
    { name: 'card draw-4 yellow', value: 4,color : "yellow" }, { name: 'card wild', value: 0,color : "wild" },{ name: 'card wild', value: 0,color : "wild" },
    { name: 'card wild', value: 0,color : "wild" }, { name: 'card wild', value: 0,color : "wild" }] as Card[];
    
    constructor(players : User[],io:any,num_players : number)
    {
        this.io = io;
        players.map(player => {
            this.users.push(player);
        });
        this.num_players = num_players;
    }

    checkUser = (id : string) : boolean => {
        for(let i = 0; i < this.num_players; i++)
        {
            if(this.users[i].id === id)
            {
                return true;
            }
        }
        return false;
    }

    sendMessage = (message : string) => {
        for(let i = 0; i < this.num_players; i++)
        {
            this.io.to(this.users[i].id).emit("message",message);
        }
    }


    homePage = () => {
        for(let i = 0; i < this.num_players; i++)
        {
            this.io.to(this.users[i].id).emit("homepage");
        }
    }
    sendData = () => {
        for(let i = 0; i < this.num_players; i++)
        {

            let all_names : string[] = this.users.map(x=>x.name);
            let cards : Card[] = [];
            for(let i = 0; i < 8; i++)
            {
                let random : number = Math.floor(Math.random() * this.deck.length);
                cards.push(this.deck[random]);
                this.deck.splice(random,1);
            }
            if(this.num_players === 4)
            {
                if(i === 1)
                {
                    const [third_element,fourth_element] : string[] = [all_names[2],all_names[3]];
                    [all_names[2],all_names[3]] = [fourth_element,third_element];
                }
                if(i === 2)
                {
                    const [first_element,second_element] : string[] = [all_names[0],all_names[1]];
                    [all_names[0],all_names[1]] = [second_element,first_element];
                }
            }
            if(this.num_players === 3)
            {
                all_names[3] = "";
            }
            if(this.num_players === 2)
            {
                if(i === 0)
                {
                    all_names[2] = all_names[1];
                    all_names[1] = "";
                }
                if(i === 1)
                {
                    all_names[1] = all_names[0];
                    all_names[0] = "";
                }
                all_names[3] = "";
            }
            this.user_cards.push({id : this.users[i].id,cards : cards})
            this.io.to(this.users[i].id).emit("player_names",{my_name : this.users[i].name,other_player_names : all_names.filter(x => x !== this.users[i].name)});
            this.io.to(this.users[i].id).emit("cards",cards);
        }

        let random : number = Math.floor(Math.random() * this.deck.length);
        for(let i = 0; i < this.num_players; i++)
        {
            this.io.to(this.users[i].id).emit("deck_card",this.deck[random]);
        }
        this.deck_card = this.deck[random];
        for(let i = 0; i < this.num_players; i++)
        {
            this.io.to(this.users[i].id).emit("turn",this.users[this.turn].name);
        }
        this.deck.splice(random,1);
    }


    cardCompatibility = (card : Card) : boolean => {

        if(this.deck_card.color === "wild" || card.color === "wild")
        {
            return true;
        }    
        if(this.deck_card.color === card.color)
        {
            return true;
        }
        if(card.name.split(' ')[1].split('-')[0]==="num" && this.deck_card.name.split(' ')[1].split('-')[0]==="num" && card.value===this.deck_card.value)
        {
            return true;
        }
        return false;
    }


    giveDrawCards = (index : number,value : number) => {
        if(this.uno_reverse_flag)
        {
            if(index === 0 && this.num_players === 4)
            {
                index = 3;
            }
            else if(index === 0 && this.num_players === 3)
            {
                index = 2;
            }
            else if(index === 0 && this.num_players === 2)
            {
                index = 1;
            }
            else
            {
                index--;
            }
            this.user_cards = this.user_cards.map(x=>{
                if(x.id === this.users[(index)%this.num_players].id)
                {
                    for(let i =0; i < value; i++)
                    {
                        let random : number = Math.floor(Math.random() * this.deck.length);
                        x.cards.push(this.deck[random]);
                        this.deck.splice(random,1);
                    }
                    this.io.to(this.users[(index)%this.num_players].id).emit("cards",x.cards);
                    return x;
                }
                else
                {
                    return x;
                }
            })
        }
        else
        {
            this.user_cards = this.user_cards.map(x=>{
                if(x.id === this.users[(index+1)%this.num_players].id)
                {
                    for(let i = 0; i < value; i++)
                    {
                        let random : number = Math.floor(Math.random() * this.deck.length);
                        x.cards.push(this.deck[random]);
                        this.deck.splice(random,1);
                    }
                    this.io.to(this.users[(index+1)%this.num_players].id).emit("cards",x.cards);
                    return x;
                }
                else
                {
                    return x;
                }
            })        
        }
    }







    calculateNextTurn = (card : Card) : number => {
        if(card.color === "wild")
        {
            return this.turn;
        }

        if(this.uno_reverse_flag)
        {
            if(card.name.split(' ')[1].split('-')[0]==="num")
            {
                if(this.turn-1 < 0 && this.num_players === 4)
                {
                    return 3;
                }
                else if(this.turn-1 < 0 && this.num_players === 3)
                {
                    return 2;
                }
                else if(this.turn-1 < 0 && this.num_players === 2)
                {
                    return 1;
                }
                else
                {
                    return this.turn-1;
                }
            } 
            if(card.name.split(' ')[1] === "reverse")
            {
                this.uno_reverse_flag = !this.uno_reverse_flag;
                return this.turn+1;
            }
            if(card.name.split(' ')[1] === "skip" || card.name.split(' ')[1].split('-')[0]==="draw")
            {
                this.turn = this.turn-2;
                if(this.num_players === 4)
                {
                    if(this.turn === -1)
                    {
                        return 3;
                    }
                    if(this.turn === -2)
                    {
                        return 2;
                    }
                }
                if(this.num_players === 3)
                {
                    if(this.turn === -1)
                    {
                        return 2;
                    }
                    if(this.turn === -2)
                    {
                        return 1;
                    }
                }
                if(this.num_players === 2)
                {
                    if(this.turn === -1)
                    {
                        return 1;
                    }
                    if(this.turn === -2)
                    {
                        return 0;
                    }
                }
                return this.turn;
            }
        }

        else
        {
            if(card.name.split(' ')[1].split('-')[0]==="num")
            {
                return this.turn+1;
            }
            if(card.name.split(' ')[1] === "skip" || card.name.split(' ')[1].split('-')[0]==="draw")
            {
                return this.turn+2;
            }
            if(card.name.split(' ')[1] === "reverse")
            {
                if(this.turn-1<0 && this.num_players === 4)
                {
                    this.turn = 3;
                }
                else if(this.turn-1<0 && this.num_players === 3)
                {
                    this.turn = 2;
                }
                else if(this.turn-1<0 && this.num_players === 2)
                {
                    this.turn = 1;
                }
                else
                {
                    this.turn--;
                }
                this.uno_reverse_flag = !this.uno_reverse_flag;
                return this.turn;
            }
        }
        return this.turn;
    }
    putCardOnDeck = (card : Card,id : string) => {
        if(this.users[this.turn%this.num_players].id !== id)
        {
            return;
        }
        if(this.cardCompatibility(card))
        {
            for(let i = 0; i < this.num_players; i++)
            {
                this.io.to(this.users[i].id).emit("deck_card",card);
            }
            this.deck_card = card;
            this.user_cards = this.user_cards.map(x=>{
                if(x.id === id)
                {
                    for(let i = 0 ; i < x.cards.length; i++)
                    {
                        if(x.cards[i].name === card.name && x.cards[i].value === card.value)
                        {
                            x.cards.splice(i,1);
                            break;
                        }
                    }
                    this.io.to(id).emit("cards",x.cards);
                    return x;
                }
                else
                {
                    return x;
                }
            })
            if(card.name.split(' ')[1].split('-')[0]==="draw")
            {
                this.giveDrawCards(this.turn,card.value);
            }
            if(this.user_cards[this.turn%this.num_players].cards.length === 0)
            {
                for(let i = 0; i < this.num_players; i++)
                {
                    this.io.to(this.users[i].id).emit("winner",this.users[this.turn%this.num_players].name);
                }
                return true;
            }
            if(this.user_cards[this.turn%this.num_players].cards.length === 1)
            {
                for(let i = 0; i < this.num_players; i++)
                {
                    this.io.to(this.users[i].id).emit("message",{message : "Uno!",name : this.users[this.turn%this.num_players].name});
                }
            }
            this.turn = this.calculateNextTurn(card);
            this.io.emit("turn",this.users[this.turn%this.num_players].name);
            for(let i = 0; i < this.num_players; i++)
            {
                this.io.to(this.users[i].id).emit("turn",this.users[this.turn%this.num_players].name);
            }
        }
        return false;
    }

    getCardFromDeck = (id : string) => {
        if(this.users[this.turn%this.num_players].id !== id)
        {
            return;
        }
        this.user_cards = this.user_cards.map(x=>{
            if(x.id === id)
            {
                let random : number = Math.floor(Math.random() * this.deck.length);
                x.cards.push(this.deck[random]);
                this.deck.splice(random,1);
                this.io.to(id).emit("cards",x.cards);
                return x;
            }
            else
            {
                return x;
            }
        })
        if(!this.uno_reverse_flag)
        {
            this.turn++;
        }
        else
        {
            this.turn--;
            if(this.turn<0 && this.num_players === 4)
            {
                this.turn = 3;
            }
            if(this.turn<0 && this.num_players === 3)
            {
                this.turn = 2;
            }
            if(this.turn<0 && this.num_players === 2)
            {
                this.turn = 1;
            }
        }
        for(let i = 0; i < this.num_players; i++)
        {
            this.io.to(this.users[i].id).emit("turn",this.users[this.turn%this.num_players].name);
        }   
    }
}
