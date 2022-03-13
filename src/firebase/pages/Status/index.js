import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "../../components/Tweet";
import {cloneDeep} from 'lodash';
import { db } from "../../services/index";
import PageHeader from "../../customComponents/PageHeader";

export default function Status () {
    let {userName, statusId} = useParams();
    const [item, setItem] = useState({});

    console.log('ddd');
    const fetchStatusHandler = async () => {
        db.ref(`tweets/${statusId}`).on("value", (snapshot) => {
            console.log("pp", snapshot);
            setItem({...snapshot.val()})
        })
    }
    

    useEffect(()=>{
        fetchStatusHandler();
    },[]);

    return (
        <div>
            <PageHeader title="Tweet" />
            <Tweet item={item} showReplies />
        </div>
    );
}