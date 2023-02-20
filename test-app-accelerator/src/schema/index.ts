// ./src/schemas/index.ts

import path from 'path'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const typesArray = loadFilesSync(path.join(__dirname, './**'))

// const typesArray = loadFilesSync(path.join(__dirname, './typeDefs'), { extensions: ['graphql'] })

export default mergeTypeDefs(typesArray)

