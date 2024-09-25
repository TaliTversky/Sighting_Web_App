import { useState } from 'react';

function useFormState() {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        timeName: "EXACT",
        reportType: "",
        site: "",
        specieCommonName:"",
        specie: "",
        count: "",
        reporter: "",
        photographer: "",
        mediaSource:  "",
        stage: null,
        sex: null,
        condition: null,
        length: null,
        diskLength: null,
        width: null,
        depth: null,
        distance: null,
        temperature: null,
        latitude: null,
        longitude: null,
        description: "",
        comments: "",
        urlLinks: null,
        substrate: null,
        weight: null
    });

    const [files, setFiles] = useState([]);
    const [selectedLifeStagesArray, setSelectedLifeStagesArray] = useState([]);
    const [selectedActivitiesArray, setSelectedActivitiesArray] = useState([]);
    const [selectedCharactersArray, setSelectedCharactersArray] = useState([]);
    const [selectedBehaviorsArray, setSelectedBehaviorsArray] = useState([]);
    const [isExactTime, setIsExactTime] = useState(false);

    return {
        formData,
        setFormData,
        files,
        setFiles,
        selectedLifeStagesArray,
        setSelectedLifeStagesArray,
        selectedActivitiesArray,
        setSelectedActivitiesArray,
        selectedCharactersArray,
        setSelectedCharactersArray,
        selectedBehaviorsArray,
        setSelectedBehaviorsArray,
        isExactTime,
        setIsExactTime,
    };
}

export default useFormState;