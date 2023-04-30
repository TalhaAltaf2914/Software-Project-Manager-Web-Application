import React, {useState, useContext, useEffect, useId} from "react";
import OrganizationModal from "../../components/Modal/Modal";
import CountrySelector from "../../components/CountrySelector/CountrySelector";
import UserContext from "../../context/UserContext";
import OrganizationContext from "../../context/OrganizationContext";

import axios from 'axios';

import './OrganizationAside.css';

export const OrganizationAside = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [organizationName, setOrganizationName] = useState('');
    const [organizationCountry, setOrganizationCountry] = useState('');
     
    const {userDetails, setUserDetails} = useContext(UserContext);
    let {organizationIds} = userDetails;
    const [orgIds, setOrgIds] = useState(organizationIds);
    // console.log(userDetails);

    const {organizations, setOrganizations, setSelectedOrganizationId} = useContext(OrganizationContext);
    // const [organizations, setOrganizations] = useState([{}]);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails.accessToken}`

    useEffect(()=>{

        if(orgIds.length>0){
            axios.get("http://localhost:4000/api/v1/organizations", {params: {organizationIds: orgIds}}).then(res=>{
                console.log(res.data.organizations);

                setOrganizations(res.data.organizations);
            }).catch(err=>{
                console.log(err.message);
            });
        }
    }, [orgIds]);
    
    const handleOrganizationCreation = (e) =>{
        e.preventDefault();
        // alert(JSON.stringify(organizationCountry.label))

        axios.post("http://localhost:4000/api/v1/organizations", {creatorId: userDetails.id, country:organizationCountry.label, name: organizationName}).then(res=>{
            console.log(res.data.organizationIds);
            delete userDetails.organizationIds;
            userDetails.organizationIds = res.data.organizationIds;
            setUserDetails({...userDetails});
            // organizationIds = res.data.organizationIds;
            console.log(`Here=> ${JSON.stringify(userDetails)}`);

            setOrgIds(res.data.organizationIds);
            setModalOpen(false);

        }).catch(err=>{console.log(err)});

    }

    const handleOrganizationClick = (e) =>{
        e.preventDefault();
        
        // console.log(document.getElementsByClassName('organization active'));
        // document.getElementsByClassName('active organization')

        // document.getElementById(e.target.id).className = 'active organization';
        setSelectedOrganizationId(e.target.id);

    }
    let id = 0;
    // const id = useId();
  return (
     <aside className='aside-organizations'>
        <h4>Organizations<hr /></h4>
        
        {(organizations.length>0)? organizations.map(organization=>{
            id++;
            
            return <div onClick={handleOrganizationClick} key={id} id={organization._id} className="organization"/*className={(id === 1)? 'organization active': 'organization'}*/>{organization.name}</div>
        }): <p>You have no organizations yet.</p>}

        <input type='button' className='add-organization-btn' value='+ New Organization'
            // onClick={handleOrganizationCreation}
            onClick={() => {
            setModalOpen(true);
            }}
        />
        

        {modalOpen && 
        
        <OrganizationModal setOpenModal={setModalOpen}>
            <form className='org-add-form' onSubmit={handleOrganizationCreation}>
                <div className='modal-section'>
                    <label htmlFor="org-name">Organization Name</label>
                    <input required type='text' id='org-name' placeholder='Organization Name' value={organizationName} onChange={(e)=>{setOrganizationName(e.target.value)}}/>

                </div>

                <div className='modal-section'>
                    <label htmlFor='org-country'>Country</label>
                    {/* <select id='org-country'  onSelect={(e)=>{setOrganizationCountry(e.target.value)}}>
                        <option value={''} />
                    </select> */}
                    <CountrySelector required={true} id={'org-country'} country={organizationCountry} setCountry={setOrganizationCountry}/>                                
                </div>

                <input type='submit' value='Create Organization' className="modal-submit-button"/>
            </form>
        </OrganizationModal>
        }
    </aside>
  )
}
