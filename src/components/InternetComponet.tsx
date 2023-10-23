import React, {useState, useContext, useEffect} from "react";
import {Text, View} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { NetworkContext } from "../context/NetworkContext";
import { NoInternet } from "./NoInternet ";


export const InternetComponet = ({ children }: any) => {
    const [isOffline, setOfflineStatus] = useState(false);
    const { isConnected, setIsConnected } = useContext(NetworkContext) 

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
            setIsConnected(offline)
        });
        return () => removeNetInfoSubscription();
    }, []);

    return (

        <View style={{
            flex: 1
        }}>
        {isOffline && <NoInternet />}
            {children} 
        </View>
    )
}





   
 
  