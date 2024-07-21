/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getSighting } from "../graphql/queries";
import { updateSighting } from "../graphql/mutations";
const client = generateClient();
export default function SightingUpdateForm(props) {
  const {
    id: idProp,
    sighting: sightingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    time: "",
    speciesCommonName: "",
    speciesScienceName: "",
    site: "",
    latitude: "",
    longitude: "",
    count: "",
    stage: "",
    sex: "",
    condition: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [time, setTime] = React.useState(initialValues.time);
  const [speciesCommonName, setSpeciesCommonName] = React.useState(
    initialValues.speciesCommonName
  );
  const [speciesScienceName, setSpeciesScienceName] = React.useState(
    initialValues.speciesScienceName
  );
  const [site, setSite] = React.useState(initialValues.site);
  const [latitude, setLatitude] = React.useState(initialValues.latitude);
  const [longitude, setLongitude] = React.useState(initialValues.longitude);
  const [count, setCount] = React.useState(initialValues.count);
  const [stage, setStage] = React.useState(initialValues.stage);
  const [sex, setSex] = React.useState(initialValues.sex);
  const [condition, setCondition] = React.useState(initialValues.condition);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = sightingRecord
      ? { ...initialValues, ...sightingRecord }
      : initialValues;
    setDate(cleanValues.date);
    setTime(cleanValues.time);
    setSpeciesCommonName(cleanValues.speciesCommonName);
    setSpeciesScienceName(cleanValues.speciesScienceName);
    setSite(cleanValues.site);
    setLatitude(cleanValues.latitude);
    setLongitude(cleanValues.longitude);
    setCount(cleanValues.count);
    setStage(cleanValues.stage);
    setSex(cleanValues.sex);
    setCondition(cleanValues.condition);
    setErrors({});
  };
  const [sightingRecord, setSightingRecord] = React.useState(sightingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSighting.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSighting
        : sightingModelProp;
      setSightingRecord(record);
    };
    queryData();
  }, [idProp, sightingModelProp]);
  React.useEffect(resetStateValues, [sightingRecord]);
  const validations = {
    date: [],
    time: [],
    speciesCommonName: [],
    speciesScienceName: [],
    site: [],
    latitude: [],
    longitude: [],
    count: [],
    stage: [],
    sex: [],
    condition: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          date: date ?? null,
          time: time ?? null,
          speciesCommonName: speciesCommonName ?? null,
          speciesScienceName: speciesScienceName ?? null,
          site: site ?? null,
          latitude: latitude ?? null,
          longitude: longitude ?? null,
          count: count ?? null,
          stage: stage ?? null,
          sex: sex ?? null,
          condition: condition ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateSighting.replaceAll("__typename", ""),
            variables: {
              input: {
                id: sightingRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SightingUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              time,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude,
              longitude,
              count,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time: value,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude,
              longitude,
              count,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Species common name"
        isRequired={false}
        isReadOnly={false}
        value={speciesCommonName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName: value,
              speciesScienceName,
              site,
              latitude,
              longitude,
              count,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.speciesCommonName ?? value;
          }
          if (errors.speciesCommonName?.hasError) {
            runValidationTasks("speciesCommonName", value);
          }
          setSpeciesCommonName(value);
        }}
        onBlur={() =>
          runValidationTasks("speciesCommonName", speciesCommonName)
        }
        errorMessage={errors.speciesCommonName?.errorMessage}
        hasError={errors.speciesCommonName?.hasError}
        {...getOverrideProps(overrides, "speciesCommonName")}
      ></TextField>
      <TextField
        label="Species science name"
        isRequired={false}
        isReadOnly={false}
        value={speciesScienceName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName: value,
              site,
              latitude,
              longitude,
              count,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.speciesScienceName ?? value;
          }
          if (errors.speciesScienceName?.hasError) {
            runValidationTasks("speciesScienceName", value);
          }
          setSpeciesScienceName(value);
        }}
        onBlur={() =>
          runValidationTasks("speciesScienceName", speciesScienceName)
        }
        errorMessage={errors.speciesScienceName?.errorMessage}
        hasError={errors.speciesScienceName?.hasError}
        {...getOverrideProps(overrides, "speciesScienceName")}
      ></TextField>
      <TextField
        label="Site"
        isRequired={false}
        isReadOnly={false}
        value={site}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName,
              site: value,
              latitude,
              longitude,
              count,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.site ?? value;
          }
          if (errors.site?.hasError) {
            runValidationTasks("site", value);
          }
          setSite(value);
        }}
        onBlur={() => runValidationTasks("site", site)}
        errorMessage={errors.site?.errorMessage}
        hasError={errors.site?.hasError}
        {...getOverrideProps(overrides, "site")}
      ></TextField>
      <TextField
        label="Latitude"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={latitude}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude: value,
              longitude,
              count,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.latitude ?? value;
          }
          if (errors.latitude?.hasError) {
            runValidationTasks("latitude", value);
          }
          setLatitude(value);
        }}
        onBlur={() => runValidationTasks("latitude", latitude)}
        errorMessage={errors.latitude?.errorMessage}
        hasError={errors.latitude?.hasError}
        {...getOverrideProps(overrides, "latitude")}
      ></TextField>
      <TextField
        label="Longitude"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={longitude}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude,
              longitude: value,
              count,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.longitude ?? value;
          }
          if (errors.longitude?.hasError) {
            runValidationTasks("longitude", value);
          }
          setLongitude(value);
        }}
        onBlur={() => runValidationTasks("longitude", longitude)}
        errorMessage={errors.longitude?.errorMessage}
        hasError={errors.longitude?.hasError}
        {...getOverrideProps(overrides, "longitude")}
      ></TextField>
      <TextField
        label="Count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={count}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude,
              longitude,
              count: value,
              stage,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.count ?? value;
          }
          if (errors.count?.hasError) {
            runValidationTasks("count", value);
          }
          setCount(value);
        }}
        onBlur={() => runValidationTasks("count", count)}
        errorMessage={errors.count?.errorMessage}
        hasError={errors.count?.hasError}
        {...getOverrideProps(overrides, "count")}
      ></TextField>
      <TextField
        label="Stage"
        isRequired={false}
        isReadOnly={false}
        value={stage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude,
              longitude,
              count,
              stage: value,
              sex,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.stage ?? value;
          }
          if (errors.stage?.hasError) {
            runValidationTasks("stage", value);
          }
          setStage(value);
        }}
        onBlur={() => runValidationTasks("stage", stage)}
        errorMessage={errors.stage?.errorMessage}
        hasError={errors.stage?.hasError}
        {...getOverrideProps(overrides, "stage")}
      ></TextField>
      <TextField
        label="Sex"
        isRequired={false}
        isReadOnly={false}
        value={sex}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude,
              longitude,
              count,
              stage,
              sex: value,
              condition,
            };
            const result = onChange(modelFields);
            value = result?.sex ?? value;
          }
          if (errors.sex?.hasError) {
            runValidationTasks("sex", value);
          }
          setSex(value);
        }}
        onBlur={() => runValidationTasks("sex", sex)}
        errorMessage={errors.sex?.errorMessage}
        hasError={errors.sex?.hasError}
        {...getOverrideProps(overrides, "sex")}
      ></TextField>
      <TextField
        label="Condition"
        isRequired={false}
        isReadOnly={false}
        value={condition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              speciesCommonName,
              speciesScienceName,
              site,
              latitude,
              longitude,
              count,
              stage,
              sex,
              condition: value,
            };
            const result = onChange(modelFields);
            value = result?.condition ?? value;
          }
          if (errors.condition?.hasError) {
            runValidationTasks("condition", value);
          }
          setCondition(value);
        }}
        onBlur={() => runValidationTasks("condition", condition)}
        errorMessage={errors.condition?.errorMessage}
        hasError={errors.condition?.hasError}
        {...getOverrideProps(overrides, "condition")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || sightingModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || sightingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
