import { PizzaName, Prisma, PrismaClient } from "@prisma/client";
import { GraphQLScalarType, Kind } from "graphql";

const prisma = new PrismaClient();

// We have to create our own Date type 
// cf: https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#example-the-date-scalar
// TODO: change the date format (from timestamp to readable string). For now, must be handled by the front
const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            return value.getTime(); // Convert outgoing Date to integer for JSON
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
        if (typeof value === 'number') {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});

// Resolvers define how to fetch the types defined in your schema.
// TODO: type correctly resolver's arguments
// TODO: rm https://www.prisma.io/docs/concepts/components/prisma-client/select-fields
// where = args.filter ? {
// OR: [
//     { description_contains: args.filter },
//     { url_contains: args.filter },
//   ],
// } : {}
type GetPizzasFilteredQuery = {
    name: PizzaName
    id: number
}

// TODO: find a way to export OrdersInput from schema.graphql
type GetOrdersQuery = {
    orderIds: [number]
    pizzaIds: [number]
    startingDate: Date
    endingDate: Date
}
const getOrdersQuery = (ordersInput: GetOrdersQuery) => {
    let andWhere: Prisma.OrderWhereInput[] = [];
    console.log(ordersInput)
    const { orderIds, pizzaIds, startingDate, endingDate } = ordersInput;

    console.log("pizzaIds", pizzaIds,
        "startingDate", startingDate,
        "endingDate", endingDate,
        "orderIds", orderIds)

    if (orderIds) {
        andWhere.push({
            id: {
                in: orderIds.map(Number)
            },
        })
    }

    if (pizzaIds) {
        andWhere.push({
            pizzaId: {
                in: pizzaIds.map(Number)
            },
        })
    }
    if (startingDate && endingDate) {
        if (endingDate < startingDate) throw new Error("Error: endingDate is before startingDate. Please change these values.")
        andWhere.push({
            date: {
                gte: startingDate,
                lte: endingDate,
            },
        })
    }

    return andWhere

}
export const resolvers = {
    Date: dateScalar,   // Have to define a custom date type
    Query: {
        getPizzas: async (parent: any, args: any, context: any, info: any) => {
            console.log("args", args.ids, args.name, args.length)
            const where: Partial<GetPizzasFilteredQuery> = {}
            // if (args.name) {
            //     where.name = args.name
            // }
            return await prisma.pizza.findMany({
                where
            })
        },
        /*
        *   Access one pizza, with its recipe, ingredients and orders.
        *   The paramater "args" can contain:
        *       - name: to find by name
        *       - id: to find by id
        *       - startDate: 
        *       - endDate:
        *       - month:
        *       
        */
        getOnePizza: async (parent: any, args: any, context: any, info: any) => {
            try {
                console.log("args", args)

                const { id, name } = (args);
                console.log("pizzaId", id, name)

                const where: Partial<GetPizzasFilteredQuery> = {}
                // TODO: handle case with 2 if
                if (args.name) where.name = args.name
                if (args.id) where.id = Number(args.id)

                const res = await prisma.pizza.findUnique({
                    where,
                    include: {
                        orders: true,
                        recipes: {
                            include: {
                                ingredient: true,
                            },
                        },
                    },
                })
                // {
                //     select: {
                //         ingredient: true
                //     }
                // },
                // include: {
                //     posts: {
                //       select: {
                //         title: true,
                //       },
                //     },

                // select: {
                //     name: true,
                //     posts: {
                //       select: {
                //         title: true,
                //       },

                console.log("res", res)
                return res
            } catch (e) {
                console.error("Error in getOnePizza Query: ", e);
            }
        },
        // getOrdersSimple: async (parent: any, args: any, context: any, info: any) => {
        //     try {
        //         const { pizzaId } = (args);
        //         console.log("pizzaId", Number(pizzaId))

        //         const res = await prisma.order.findMany({
        //             where: {
        //                 pizzaId: Number(pizzaId)
        //             },
        //             select: {
        //                 id: true,
        //                 quantity: true,
        //                 date: true,
        //                 // pizza: {
        //                 //     select: {
        //                 //         id: true,
        //                 //         name: true,
        //                 //         price: true,
        //                 //         recipes: {
        //                 //             select: {
        //                 //                 ingredient: {
        //                 //                     select: {
        //                 //                         id: true,
        //                 //                         name: true,
        //                 //                         price: true,
        //                 //                         unit: true
        //                 //                     }
        //                 //                 },
        //                 //                 quantity: true
        //                 //             }
        //                 //         }
        //                 //     }
        //                 // }
        //             },
        //         })

        //         console.log("res", res, "length", res.length)
        //         return res
        //     } catch (e) {
        //         console.error("Error in getOnePizza Query: ", e);
        //     }
        // },
        // TODO: add filter by pizzaName
        // TODO: add filter by month name
        getOrders: async (parent: any, args: any, context: any, info: any) => {
            try {
                // const where: Partial<GetPizzasFilteredQuery> = {}
                console.log("args", args)

                let andWhere: Prisma.OrderWhereInput[] = getOrdersQuery(args.ordersInput);
                console.log("andWhere", andWhere)
                const res = await prisma.order.findMany({
                    where: {
                        AND: andWhere
                    },
                    select: {
                        id: true,
                        quantity: true,
                        date: true,
                        pizza: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                recipes: {
                                    select: {
                                        ingredient: {
                                            select: {
                                                id: true,
                                                name: true,
                                                price: true,
                                                unit: true
                                            }
                                        },
                                        quantity: true
                                    }
                                }
                            }
                        }
                    },
                })

                console.log("length", res.length)
                return res
            } catch (e) {
                console.error("Error in getOrders Query: ", e);
            }
        },
        // getRecipeForOnePizza: async (parent: any, args: any, context: any, info: any) => {
        //     try {
        //         const { pizzaId } = args;

        //         console.log("pizzaId", pizzaId)
        //         const res = await prisma.recipe.findMany({
        //             where: {
        //                 pizzaId: Number(pizzaId)
        //             },
        //             include: {
        //                 ingredient: true,
        //                 pizza: {
        //                     select: {
        //                         name: true
        //                     }
        //                 },
        //             },
        //         })
        //         console.log("res", res)
        //         return res


        //     } catch (e) {
        //         console.error("Error in getRecipeForOnePizza Query: ", e);
        //     }
        // },
        // getOrdersForOnePizza: async (parent: any, args: any, context: any, info: any) => {
        //     try {
        //         const { pizzaId } = args;
        //         console.log("parent", parent)

        //         const res = await prisma.order.findMany({
        //             where: {
        //                 pizzaId: Number(pizzaId)
        //             },
        //             include: {
        //                 pizza: {
        //                     select: {
        //                         name: true,
        //                         id: true
        //                     }
        //                 },
        //             },
        //         })
        //         console.log("res", res)
        //         return res


        //     } catch (e) {
        //         console.error("Error in getOrdersForOnePizza Query: ", e);
        //     }
        // },
    },
};

    // {
                //     select: {
                //         ingredient: true
                //     }
                // },
                // include: {
                //     posts: {
                //       select: {
                //         title: true,
                //       },
                //     },

                // select: {
                //     name: true,
                //     posts: {
                //       select: {
                //         title: true,
                //       },