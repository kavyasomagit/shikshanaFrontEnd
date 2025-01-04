import '../RelatedCourses/RelatedCourses.css'
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { ProfileCard } from '../../Components'


export const RelatedCourses = ({singleProfile, queryParameters_Nav}) => {

    const [queryParameters, setQueryParameters] = useState({ Class: [], Subject:[] });

    const {_id, Course} = singleProfile


    useEffect(() => {
        if (Course) {
            const classes = [];
            const subjects = [];
            Course.forEach(element => {
                if (!classes.includes(element.Class)) {
                    classes.push(element.Class);
                }
                if (!subjects.includes(element.Subject)) {
                    subjects.push(element.Subject);
                }
            });

            setQueryParameters({ Class: classes, Subject: subjects });
        }
    }, [Course]);

    const comParams = { ...queryParameters_Nav, ...queryParameters };

    console.log('comparams', comParams);
    const params = new URLSearchParams();
    for (const key in comParams) {
        if (Array.isArray(comParams[key])) {
            comParams[key].forEach(value => params.append(key, value));
        } else {
            console.log(key, comParams[key]);
            params.append(key, comParams[key]);
        }
    }

    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://shikshana.vercel.app/api/filter`, { params });
                setProfiles(data)
                console.log(profiles)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [comParams])


    return (
        <Fragment>
            <h3>RelatedCourses</h3>
            <main className='main'>
            {
                profiles && profiles
                .filter(profile => profile._id !== _id)
                .map((profile) => <ProfileCard key={profile._id} profile={profile}/>)
            }
            </main>
        </Fragment>
    ) 
}