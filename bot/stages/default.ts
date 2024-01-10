type OptionAction =
    | {
    name: ActionType.NEXT;
    params: [number];
}
    | {
    name: ActionType.LOCATION;
    params: [number, number, string];
}
    | {
    name: ActionType.VOICE;
    params: [number]
}
    | {
    name: ActionType.TEXT;
    params: [string]
} | {
    name: ActionType.INPUT;
}

export type Option = {
    id: number;
    text: string;
    actions: OptionAction[];
}

export type Stage = {
    message: string | undefined;
    options: Option[];
}

type Stages = {
    [key: string]: Stage;
}

type Data = {
    stages: Stages;
}

export enum ActionType {
    TEXT = "text", // send location
    LOCATION = "location", // send location
    VOICE = "voice", // send voice message
    NEXT = "next", // go to next stage
    INPUT = "input", // save user input
}

const data: Data = {
    stages: {
        "0": {
            message: undefined,
            options: [
                {
                    id: 1,
                    text: "Digite *1* para ver serviços disponíveis.",
                    actions: [
                        {
                            name: ActionType.TEXT,
                            params: ['Nós oferecemos uma variedade de serviços']
                        },
                        {
                            name: ActionType.TEXT,
                            params: ['Vou te mostrar uma lista com serviços e você pode selecionar um deles para saber mais detalhes']
                        },
                        {
                            name: ActionType.NEXT,
                            params: [1]
                        },
                    ]
                },
                {
                    id: 2,
                    text: "Digite *2* para consultar o status de um pedido.",
                    actions: [
                        {
                            name: ActionType.TEXT,
                            params: ['Você pode me informar o número do pedido?']
                        },
                        {
                            name: ActionType.INPUT,
                        },
                    ]
                },
                {
                    id: 3,
                    text: "Digite *3* para falar com a equipe de suporte.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [3]
                        },
                    ]
                },
                {
                    id: 4,
                    text: "Digite *4* para saber mais sobre nossa clínica e localização.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [4]
                        },
                    ]
                },
                {
                    id: 5,
                    text: "Digite *5* para obter informações sobre preços e pagamento.",
                    actions: [
                        {
                            name: ActionType.LOCATION,
                            params: [0, -0, "Planeta Terra\nEm algum lugar do universo"]
                        },
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                },
            ]
        },
        "1": {
            message: "Aqui estão os serviços que oferecemos",
            options: [
                {
                    id: 1,
                    text: "Pacote de seguidores",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                },
                {
                    id: 2,
                    text: "Pacote de curtidas",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                },
                {
                    id: 0,
                    text: "Digite *0* para voltar ao menu principal.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                }
            ]
        },
        "2": {
            message: "Você pode agendar um procedimento da seguinte maneira:",
            options: [
                {
                    id: 1,
                    text: "Digite *1* para escolher o tipo de procedimento.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [5]
                        },
                    ]
                },
                {
                    id: 2,
                    text: "Digite *2* para escolher a data e horário disponível.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [6]
                        },
                    ]
                },
                {
                    id: 3,
                    text: "Digite *3* para confirmar o agendamento.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [7]
                        },
                    ]
                },
                {
                    id: 0,
                    text: "Digite *0* para voltar ao menu principal.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                }
            ]
        },
        "3": {
            message: "Você será redirecionado para falar com a secretaria.",
            options: [
                {
                    id: 0,
                    text: "Digite *0* para voltar ao menu principal.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                }
            ]
        },
        "4": {
            message: undefined,
            options: [
                {
                    id: 0,
                    text: "Digite *0* para voltar ao menu principal.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                }
            ]
        },
        "5": {
            message: "Escolha o tipo de procedimento:",
            options: [
                {
                    id: 1,
                    text: "Opção 1",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                },
                {
                    id: 2,
                    text: "Opção 2",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                },
                {
                    id: 0,
                    text: "Digite *0* para voltar ao menu principal.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                }
            ]
        },
        "6": {
            message: "Escolha a data e horário disponível:",
            options: [
                {
                    id: 2,
                    text: "Opção 1",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                },
                {
                    id: 3,
                    text: "Opção 2",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                },
                {
                    id: 0,
                    text: "Digite *0* para voltar ao menu principal.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                }
            ]
        },
        "7": {
            message: "Agendamento confirmado.",
            options: [
                {
                    id: 0,
                    text: "Digite *0* para voltar ao menu principal.",
                    actions: [
                        {
                            name: ActionType.NEXT,
                            params: [0]
                        },
                    ]
                }
            ]
        }
    }
};


export default data;