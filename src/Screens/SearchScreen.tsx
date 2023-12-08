import React from 'react'
import { SearchBar } from '../components/searchBar'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


interface Props extends NativeStackScreenProps<any, any> { }


export const SearchScreen = ({navigation, route}: Props) => {
    return (
          <SearchBar navigation={navigation} />
    )
}
