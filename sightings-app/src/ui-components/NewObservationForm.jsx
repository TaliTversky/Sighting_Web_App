/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createObservation } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function NewObservationForm(props) {
  const {
    clearOnSuccess = true,
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
    timeName: "",
    count: "",
    stage: "",
    sex: "",
    condition: "",
    depth: "",
    distance: "",
    temperature: "",
    latitude: "",
    longitude: "",
    description: "",
    comments: "",
    substrate: [],
    weight: "",
    reportType: "",
    site: "",
    country: "",
    specieCommonName: "",
    specie: "",
    reporter: "",
    photographer: "",
    mediaSource: "",
    length: "",
    diskLength: "",
    width: "",
    group: "",
    labels: [],
    Media: [],
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [time, setTime] = React.useState(initialValues.time);
  const [timeName, setTimeName] = React.useState(initialValues.timeName);
  const [count, setCount] = React.useState(initialValues.count);
  const [stage, setStage] = React.useState(initialValues.stage);
  const [sex, setSex] = React.useState(initialValues.sex);
  const [condition, setCondition] = React.useState(initialValues.condition);
  const [depth, setDepth] = React.useState(initialValues.depth);
  const [distance, setDistance] = React.useState(initialValues.distance);
  const [temperature, setTemperature] = React.useState(
    initialValues.temperature
  );
  const [latitude, setLatitude] = React.useState(initialValues.latitude);
  const [longitude, setLongitude] = React.useState(initialValues.longitude);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [comments, setComments] = React.useState(initialValues.comments);
  const [substrate, setSubstrate] = React.useState(initialValues.substrate);
  const [weight, setWeight] = React.useState(initialValues.weight);
  const [reportType, setReportType] = React.useState(initialValues.reportType);
  const [site, setSite] = React.useState(initialValues.site);
  const [country, setCountry] = React.useState(initialValues.country);
  const [specieCommonName, setSpecieCommonName] = React.useState(
    initialValues.specieCommonName
  );
  const [specie, setSpecie] = React.useState(initialValues.specie);
  const [reporter, setReporter] = React.useState(initialValues.reporter);
  const [photographer, setPhotographer] = React.useState(
    initialValues.photographer
  );
  const [mediaSource, setMediaSource] = React.useState(
    initialValues.mediaSource
  );
  const [length, setLength] = React.useState(initialValues.length);
  const [diskLength, setDiskLength] = React.useState(initialValues.diskLength);
  const [width, setWidth] = React.useState(initialValues.width);
  const [group, setGroup] = React.useState(initialValues.group);
  const [labels, setLabels] = React.useState(initialValues.labels);
  const [Media, setMedia] = React.useState(initialValues.Media);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDate(initialValues.date);
    setTime(initialValues.time);
    setTimeName(initialValues.timeName);
    setCount(initialValues.count);
    setStage(initialValues.stage);
    setSex(initialValues.sex);
    setCondition(initialValues.condition);
    setDepth(initialValues.depth);
    setDistance(initialValues.distance);
    setTemperature(initialValues.temperature);
    setLatitude(initialValues.latitude);
    setLongitude(initialValues.longitude);
    setDescription(initialValues.description);
    setComments(initialValues.comments);
    setSubstrate(initialValues.substrate);
    setCurrentSubstrateValue("");
    setWeight(initialValues.weight);
    setReportType(initialValues.reportType);
    setSite(initialValues.site);
    setCountry(initialValues.country);
    setSpecieCommonName(initialValues.specieCommonName);
    setSpecie(initialValues.specie);
    setReporter(initialValues.reporter);
    setPhotographer(initialValues.photographer);
    setMediaSource(initialValues.mediaSource);
    setLength(initialValues.length);
    setDiskLength(initialValues.diskLength);
    setWidth(initialValues.width);
    setGroup(initialValues.group);
    setLabels(initialValues.labels);
    setCurrentLabelsValue("");
    setMedia(initialValues.Media);
    setCurrentMediaValue("");
    setErrors({});
  };
  const [currentSubstrateValue, setCurrentSubstrateValue] = React.useState("");
  const substrateRef = React.createRef();
  const [currentLabelsValue, setCurrentLabelsValue] = React.useState("");
  const labelsRef = React.createRef();
  const [currentMediaValue, setCurrentMediaValue] = React.useState("");
  const MediaRef = React.createRef();
  const getDisplayValue = {
    substrate: (r) => {
      const enumDisplayValueMap = {
        NA: "Na",
        MUDDY: "Muddy",
        HARD: "Hard",
        ROCKY: "Rocky",
        SANDY: "Sandy",
        SEAWEED_BEDS_OR_PATCHES: "Seaweed beds or patches",
        WATER_COLUMN: "Water column",
        CORALS: "Corals",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    date: [{ type: "Required" }],
    time: [],
    timeName: [],
    count: [{ type: "Required" }],
    stage: [],
    sex: [],
    condition: [],
    depth: [],
    distance: [],
    temperature: [],
    latitude: [],
    longitude: [],
    description: [],
    comments: [],
    substrate: [],
    weight: [],
    reportType: [],
    site: [],
    country: [],
    specieCommonName: [],
    specie: [],
    reporter: [],
    photographer: [],
    mediaSource: [],
    length: [],
    diskLength: [],
    width: [],
    group: [],
    labels: [],
    Media: [],
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
          date,
          time,
          timeName,
          count,
          stage,
          sex,
          condition,
          depth,
          distance,
          temperature,
          latitude,
          longitude,
          description,
          comments,
          substrate,
          weight,
          reportType,
          site,
          country,
          specieCommonName,
          specie,
          reporter,
          photographer,
          mediaSource,
          length,
          diskLength,
          width,
          group,
          labels,
          Media,
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
            query: createObservation.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NewObservationForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
      <SelectField
        label="Time name"
        placeholder="Please select an option"
        isDisabled={false}
        value={timeName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName: value,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.timeName ?? value;
          }
          if (errors.timeName?.hasError) {
            runValidationTasks("timeName", value);
          }
          setTimeName(value);
        }}
        onBlur={() => runValidationTasks("timeName", timeName)}
        errorMessage={errors.timeName?.errorMessage}
        hasError={errors.timeName?.hasError}
        {...getOverrideProps(overrides, "timeName")}
      >
        <option
          children="Morning"
          value="MORNING"
          {...getOverrideProps(overrides, "timeNameoption0")}
        ></option>
        <option
          children="Afternoon"
          value="AFTERNOON"
          {...getOverrideProps(overrides, "timeNameoption1")}
        ></option>
        <option
          children="Evening"
          value="EVENING"
          {...getOverrideProps(overrides, "timeNameoption2")}
        ></option>
        <option
          children="Night"
          value="NIGHT"
          {...getOverrideProps(overrides, "timeNameoption3")}
        ></option>
        <option
          children="Dawn"
          value="DAWN"
          {...getOverrideProps(overrides, "timeNameoption4")}
        ></option>
        <option
          children="Light"
          value="LIGHT"
          {...getOverrideProps(overrides, "timeNameoption5")}
        ></option>
        <option
          children="Dark"
          value="DARK"
          {...getOverrideProps(overrides, "timeNameoption6")}
        ></option>
        <option
          children="Dusk"
          value="DUSK"
          {...getOverrideProps(overrides, "timeNameoption7")}
        ></option>
        <option
          children="Uncpecified"
          value="UNCPECIFIED"
          {...getOverrideProps(overrides, "timeNameoption8")}
        ></option>
        <option
          children="Exact"
          value="EXACT"
          {...getOverrideProps(overrides, "timeNameoption9")}
        ></option>
      </SelectField>
      <TextField
        label="Count"
        isRequired={true}
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
              timeName,
              count: value,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
      <SelectField
        label="Stage"
        placeholder="Please select an option"
        isDisabled={false}
        value={stage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage: value,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
      >
        <option
          children="Na"
          value="NA"
          {...getOverrideProps(overrides, "stageoption0")}
        ></option>
        <option
          children="Juvenile"
          value="JUVENILE"
          {...getOverrideProps(overrides, "stageoption1")}
        ></option>
        <option
          children="Adult"
          value="ADULT"
          {...getOverrideProps(overrides, "stageoption2")}
        ></option>
        <option
          children="Subadult"
          value="SUBADULT"
          {...getOverrideProps(overrides, "stageoption3")}
        ></option>
        <option
          children="Egg"
          value="EGG"
          {...getOverrideProps(overrides, "stageoption4")}
        ></option>
        <option
          children="Mix"
          value="MIX"
          {...getOverrideProps(overrides, "stageoption5")}
        ></option>
      </SelectField>
      <SelectField
        label="Sex"
        placeholder="Please select an option"
        isDisabled={false}
        value={sex}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex: value,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
      >
        <option
          children="Na"
          value="NA"
          {...getOverrideProps(overrides, "sexoption0")}
        ></option>
        <option
          children="Female"
          value="FEMALE"
          {...getOverrideProps(overrides, "sexoption1")}
        ></option>
        <option
          children="Male"
          value="MALE"
          {...getOverrideProps(overrides, "sexoption2")}
        ></option>
        <option
          children="Both"
          value="BOTH"
          {...getOverrideProps(overrides, "sexoption3")}
        ></option>
      </SelectField>
      <SelectField
        label="Condition"
        placeholder="Please select an option"
        isDisabled={false}
        value={condition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition: value,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
      >
        <option
          children="Na"
          value="NA"
          {...getOverrideProps(overrides, "conditionoption0")}
        ></option>
        <option
          children="Alive and free"
          value="ALIVE_AND_FREE"
          {...getOverrideProps(overrides, "conditionoption1")}
        ></option>
        <option
          children="Found dead"
          value="FOUND_DEAD"
          {...getOverrideProps(overrides, "conditionoption2")}
        ></option>
        <option
          children="Caught and released"
          value="CAUGHT_AND_RELEASED"
          {...getOverrideProps(overrides, "conditionoption3")}
        ></option>
        <option
          children="Landed or killed"
          value="LANDED_OR_KILLED"
          {...getOverrideProps(overrides, "conditionoption4")}
        ></option>
        <option
          children="Found injured"
          value="FOUND_INJURED"
          {...getOverrideProps(overrides, "conditionoption5")}
        ></option>
        <option
          children="Fished unknown"
          value="FISHED_UNKNOWN"
          {...getOverrideProps(overrides, "conditionoption6")}
        ></option>
      </SelectField>
      <TextField
        label="Depth"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={depth}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth: value,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.depth ?? value;
          }
          if (errors.depth?.hasError) {
            runValidationTasks("depth", value);
          }
          setDepth(value);
        }}
        onBlur={() => runValidationTasks("depth", depth)}
        errorMessage={errors.depth?.errorMessage}
        hasError={errors.depth?.hasError}
        {...getOverrideProps(overrides, "depth")}
      ></TextField>
      <TextField
        label="Distance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={distance}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance: value,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.distance ?? value;
          }
          if (errors.distance?.hasError) {
            runValidationTasks("distance", value);
          }
          setDistance(value);
        }}
        onBlur={() => runValidationTasks("distance", distance)}
        errorMessage={errors.distance?.errorMessage}
        hasError={errors.distance?.hasError}
        {...getOverrideProps(overrides, "distance")}
      ></TextField>
      <TextField
        label="Temperature"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={temperature}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature: value,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.temperature ?? value;
          }
          if (errors.temperature?.hasError) {
            runValidationTasks("temperature", value);
          }
          setTemperature(value);
        }}
        onBlur={() => runValidationTasks("temperature", temperature)}
        errorMessage={errors.temperature?.errorMessage}
        hasError={errors.temperature?.hasError}
        {...getOverrideProps(overrides, "temperature")}
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
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude: value,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude: value,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description: value,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Comments"
        isRequired={false}
        isReadOnly={false}
        value={comments}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments: value,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.comments ?? value;
          }
          if (errors.comments?.hasError) {
            runValidationTasks("comments", value);
          }
          setComments(value);
        }}
        onBlur={() => runValidationTasks("comments", comments)}
        errorMessage={errors.comments?.errorMessage}
        hasError={errors.comments?.hasError}
        {...getOverrideProps(overrides, "comments")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate: values,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            values = result?.substrate ?? values;
          }
          setSubstrate(values);
          setCurrentSubstrateValue("");
        }}
        currentFieldValue={currentSubstrateValue}
        label={"Substrate"}
        items={substrate}
        hasError={errors?.substrate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("substrate", currentSubstrateValue)
        }
        errorMessage={errors?.substrate?.errorMessage}
        getBadgeText={getDisplayValue.substrate}
        setFieldValue={setCurrentSubstrateValue}
        inputFieldRef={substrateRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Substrate"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentSubstrateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.substrate?.hasError) {
              runValidationTasks("substrate", value);
            }
            setCurrentSubstrateValue(value);
          }}
          onBlur={() => runValidationTasks("substrate", currentSubstrateValue)}
          errorMessage={errors.substrate?.errorMessage}
          hasError={errors.substrate?.hasError}
          ref={substrateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "substrate")}
        >
          <option
            children="Na"
            value="NA"
            {...getOverrideProps(overrides, "substrateoption0")}
          ></option>
          <option
            children="Muddy"
            value="MUDDY"
            {...getOverrideProps(overrides, "substrateoption1")}
          ></option>
          <option
            children="Hard"
            value="HARD"
            {...getOverrideProps(overrides, "substrateoption2")}
          ></option>
          <option
            children="Rocky"
            value="ROCKY"
            {...getOverrideProps(overrides, "substrateoption3")}
          ></option>
          <option
            children="Sandy"
            value="SANDY"
            {...getOverrideProps(overrides, "substrateoption4")}
          ></option>
          <option
            children="Seaweed beds or patches"
            value="SEAWEED_BEDS_OR_PATCHES"
            {...getOverrideProps(overrides, "substrateoption5")}
          ></option>
          <option
            children="Water column"
            value="WATER_COLUMN"
            {...getOverrideProps(overrides, "substrateoption6")}
          ></option>
          <option
            children="Corals"
            value="CORALS"
            {...getOverrideProps(overrides, "substrateoption7")}
          ></option>
        </SelectField>
      </ArrayField>
      <TextField
        label="Weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={weight}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight: value,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.weight ?? value;
          }
          if (errors.weight?.hasError) {
            runValidationTasks("weight", value);
          }
          setWeight(value);
        }}
        onBlur={() => runValidationTasks("weight", weight)}
        errorMessage={errors.weight?.errorMessage}
        hasError={errors.weight?.hasError}
        {...getOverrideProps(overrides, "weight")}
      ></TextField>
      <TextField
        label="Report type"
        isRequired={false}
        isReadOnly={false}
        value={reportType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType: value,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.reportType ?? value;
          }
          if (errors.reportType?.hasError) {
            runValidationTasks("reportType", value);
          }
          setReportType(value);
        }}
        onBlur={() => runValidationTasks("reportType", reportType)}
        errorMessage={errors.reportType?.errorMessage}
        hasError={errors.reportType?.hasError}
        {...getOverrideProps(overrides, "reportType")}
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
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site: value,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
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
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country: value,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <TextField
        label="Specie common name"
        isRequired={false}
        isReadOnly={false}
        value={specieCommonName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName: value,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.specieCommonName ?? value;
          }
          if (errors.specieCommonName?.hasError) {
            runValidationTasks("specieCommonName", value);
          }
          setSpecieCommonName(value);
        }}
        onBlur={() => runValidationTasks("specieCommonName", specieCommonName)}
        errorMessage={errors.specieCommonName?.errorMessage}
        hasError={errors.specieCommonName?.hasError}
        {...getOverrideProps(overrides, "specieCommonName")}
      ></TextField>
      <TextField
        label="Specie"
        isRequired={false}
        isReadOnly={false}
        value={specie}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie: value,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.specie ?? value;
          }
          if (errors.specie?.hasError) {
            runValidationTasks("specie", value);
          }
          setSpecie(value);
        }}
        onBlur={() => runValidationTasks("specie", specie)}
        errorMessage={errors.specie?.errorMessage}
        hasError={errors.specie?.hasError}
        {...getOverrideProps(overrides, "specie")}
      ></TextField>
      <TextField
        label="Reporter"
        isRequired={false}
        isReadOnly={false}
        value={reporter}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter: value,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.reporter ?? value;
          }
          if (errors.reporter?.hasError) {
            runValidationTasks("reporter", value);
          }
          setReporter(value);
        }}
        onBlur={() => runValidationTasks("reporter", reporter)}
        errorMessage={errors.reporter?.errorMessage}
        hasError={errors.reporter?.hasError}
        {...getOverrideProps(overrides, "reporter")}
      ></TextField>
      <TextField
        label="Photographer"
        isRequired={false}
        isReadOnly={false}
        value={photographer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer: value,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.photographer ?? value;
          }
          if (errors.photographer?.hasError) {
            runValidationTasks("photographer", value);
          }
          setPhotographer(value);
        }}
        onBlur={() => runValidationTasks("photographer", photographer)}
        errorMessage={errors.photographer?.errorMessage}
        hasError={errors.photographer?.hasError}
        {...getOverrideProps(overrides, "photographer")}
      ></TextField>
      <TextField
        label="Media source"
        isRequired={false}
        isReadOnly={false}
        value={mediaSource}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource: value,
              length,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.mediaSource ?? value;
          }
          if (errors.mediaSource?.hasError) {
            runValidationTasks("mediaSource", value);
          }
          setMediaSource(value);
        }}
        onBlur={() => runValidationTasks("mediaSource", mediaSource)}
        errorMessage={errors.mediaSource?.errorMessage}
        hasError={errors.mediaSource?.hasError}
        {...getOverrideProps(overrides, "mediaSource")}
      ></TextField>
      <TextField
        label="Length"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={length}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length: value,
              diskLength,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.length ?? value;
          }
          if (errors.length?.hasError) {
            runValidationTasks("length", value);
          }
          setLength(value);
        }}
        onBlur={() => runValidationTasks("length", length)}
        errorMessage={errors.length?.errorMessage}
        hasError={errors.length?.hasError}
        {...getOverrideProps(overrides, "length")}
      ></TextField>
      <TextField
        label="Disk length"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={diskLength}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength: value,
              width,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.diskLength ?? value;
          }
          if (errors.diskLength?.hasError) {
            runValidationTasks("diskLength", value);
          }
          setDiskLength(value);
        }}
        onBlur={() => runValidationTasks("diskLength", diskLength)}
        errorMessage={errors.diskLength?.errorMessage}
        hasError={errors.diskLength?.hasError}
        {...getOverrideProps(overrides, "diskLength")}
      ></TextField>
      <TextField
        label="Width"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={width}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width: value,
              group,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.width ?? value;
          }
          if (errors.width?.hasError) {
            runValidationTasks("width", value);
          }
          setWidth(value);
        }}
        onBlur={() => runValidationTasks("width", width)}
        errorMessage={errors.width?.errorMessage}
        hasError={errors.width?.hasError}
        {...getOverrideProps(overrides, "width")}
      ></TextField>
      <TextField
        label="Group"
        isRequired={false}
        isReadOnly={false}
        value={group}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group: value,
              labels,
              Media,
            };
            const result = onChange(modelFields);
            value = result?.group ?? value;
          }
          if (errors.group?.hasError) {
            runValidationTasks("group", value);
          }
          setGroup(value);
        }}
        onBlur={() => runValidationTasks("group", group)}
        errorMessage={errors.group?.errorMessage}
        hasError={errors.group?.hasError}
        {...getOverrideProps(overrides, "group")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels: values,
              Media,
            };
            const result = onChange(modelFields);
            values = result?.labels ?? values;
          }
          setLabels(values);
          setCurrentLabelsValue("");
        }}
        currentFieldValue={currentLabelsValue}
        label={"Labels"}
        items={labels}
        hasError={errors?.labels?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("labels", currentLabelsValue)
        }
        errorMessage={errors?.labels?.errorMessage}
        setFieldValue={setCurrentLabelsValue}
        inputFieldRef={labelsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Labels"
          isRequired={false}
          isReadOnly={false}
          value={currentLabelsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.labels?.hasError) {
              runValidationTasks("labels", value);
            }
            setCurrentLabelsValue(value);
          }}
          onBlur={() => runValidationTasks("labels", currentLabelsValue)}
          errorMessage={errors.labels?.errorMessage}
          hasError={errors.labels?.hasError}
          ref={labelsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "labels")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date,
              time,
              timeName,
              count,
              stage,
              sex,
              condition,
              depth,
              distance,
              temperature,
              latitude,
              longitude,
              description,
              comments,
              substrate,
              weight,
              reportType,
              site,
              country,
              specieCommonName,
              specie,
              reporter,
              photographer,
              mediaSource,
              length,
              diskLength,
              width,
              group,
              labels,
              Media: values,
            };
            const result = onChange(modelFields);
            values = result?.Media ?? values;
          }
          setMedia(values);
          setCurrentMediaValue("");
        }}
        currentFieldValue={currentMediaValue}
        label={"Media"}
        items={Media}
        hasError={errors?.Media?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Media", currentMediaValue)
        }
        errorMessage={errors?.Media?.errorMessage}
        setFieldValue={setCurrentMediaValue}
        inputFieldRef={MediaRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Media"
          isRequired={false}
          isReadOnly={false}
          value={currentMediaValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Media?.hasError) {
              runValidationTasks("Media", value);
            }
            setCurrentMediaValue(value);
          }}
          onBlur={() => runValidationTasks("Media", currentMediaValue)}
          errorMessage={errors.Media?.errorMessage}
          hasError={errors.Media?.hasError}
          ref={MediaRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Media")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
