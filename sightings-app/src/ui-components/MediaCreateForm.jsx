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
import { createMedia } from "../graphql/mutations";
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
export default function MediaCreateForm(props) {
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
    Image: "",
    specie: "",
    Date: "",
    time: "",
    place: "",
    type: "",
    quality: "",
    lifeStage: [],
    activity: [],
    characters: [],
    behavior: [],
    observationID: "",
  };
  const [Image, setImage] = React.useState(initialValues.Image);
  const [specie, setSpecie] = React.useState(initialValues.specie);
  const [Date, setDate] = React.useState(initialValues.Date);
  const [time, setTime] = React.useState(initialValues.time);
  const [place, setPlace] = React.useState(initialValues.place);
  const [type, setType] = React.useState(initialValues.type);
  const [quality, setQuality] = React.useState(initialValues.quality);
  const [lifeStage, setLifeStage] = React.useState(initialValues.lifeStage);
  const [activity, setActivity] = React.useState(initialValues.activity);
  const [characters, setCharacters] = React.useState(initialValues.characters);
  const [behavior, setBehavior] = React.useState(initialValues.behavior);
  const [observationID, setObservationID] = React.useState(
    initialValues.observationID
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setImage(initialValues.Image);
    setSpecie(initialValues.specie);
    setDate(initialValues.Date);
    setTime(initialValues.time);
    setPlace(initialValues.place);
    setType(initialValues.type);
    setQuality(initialValues.quality);
    setLifeStage(initialValues.lifeStage);
    setCurrentLifeStageValue("");
    setActivity(initialValues.activity);
    setCurrentActivityValue("");
    setCharacters(initialValues.characters);
    setCurrentCharactersValue("");
    setBehavior(initialValues.behavior);
    setCurrentBehaviorValue("");
    setObservationID(initialValues.observationID);
    setErrors({});
  };
  const [currentLifeStageValue, setCurrentLifeStageValue] = React.useState("");
  const lifeStageRef = React.createRef();
  const [currentActivityValue, setCurrentActivityValue] = React.useState("");
  const activityRef = React.createRef();
  const [currentCharactersValue, setCurrentCharactersValue] =
    React.useState("");
  const charactersRef = React.createRef();
  const [currentBehaviorValue, setCurrentBehaviorValue] = React.useState("");
  const behaviorRef = React.createRef();
  const getDisplayValue = {
    lifeStage: (r) => {
      const enumDisplayValueMap = {
        NA: "Na",
        JUVENILE: "Juvenile",
        ADULT: "Adult",
        SUBADULT: "Subadult",
        EGG: "Egg",
        MIX: "Mix",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    Image: [],
    specie: [],
    Date: [],
    time: [],
    place: [],
    type: [],
    quality: [],
    lifeStage: [],
    activity: [],
    characters: [],
    behavior: [],
    observationID: [{ type: "Required" }],
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
          Image,
          specie,
          Date,
          time,
          place,
          type,
          quality,
          lifeStage,
          activity,
          characters,
          behavior,
          observationID,
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
            query: createMedia.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "MediaCreateForm")}
      {...rest}
    >
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={Image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Image: value,
              specie,
              Date,
              time,
              place,
              type,
              quality,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            value = result?.Image ?? value;
          }
          if (errors.Image?.hasError) {
            runValidationTasks("Image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("Image", Image)}
        errorMessage={errors.Image?.errorMessage}
        hasError={errors.Image?.hasError}
        {...getOverrideProps(overrides, "Image")}
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
              Image,
              specie: value,
              Date,
              time,
              place,
              type,
              quality,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID,
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
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={Date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date: value,
              time,
              place,
              type,
              quality,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            value = result?.Date ?? value;
          }
          if (errors.Date?.hasError) {
            runValidationTasks("Date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("Date", Date)}
        errorMessage={errors.Date?.errorMessage}
        hasError={errors.Date?.hasError}
        {...getOverrideProps(overrides, "Date")}
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
              Image,
              specie,
              Date,
              time: value,
              place,
              type,
              quality,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID,
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
        label="Place"
        isRequired={false}
        isReadOnly={false}
        value={place}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place: value,
              type,
              quality,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            value = result?.place ?? value;
          }
          if (errors.place?.hasError) {
            runValidationTasks("place", value);
          }
          setPlace(value);
        }}
        onBlur={() => runValidationTasks("place", place)}
        errorMessage={errors.place?.errorMessage}
        hasError={errors.place?.hasError}
        {...getOverrideProps(overrides, "place")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place,
              type: value,
              quality,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Quality"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={quality}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place,
              type,
              quality: value,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            value = result?.quality ?? value;
          }
          if (errors.quality?.hasError) {
            runValidationTasks("quality", value);
          }
          setQuality(value);
        }}
        onBlur={() => runValidationTasks("quality", quality)}
        errorMessage={errors.quality?.errorMessage}
        hasError={errors.quality?.hasError}
        {...getOverrideProps(overrides, "quality")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place,
              type,
              quality,
              lifeStage: values,
              activity,
              characters,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            values = result?.lifeStage ?? values;
          }
          setLifeStage(values);
          setCurrentLifeStageValue("");
        }}
        currentFieldValue={currentLifeStageValue}
        label={"Life stage"}
        items={lifeStage}
        hasError={errors?.lifeStage?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lifeStage", currentLifeStageValue)
        }
        errorMessage={errors?.lifeStage?.errorMessage}
        getBadgeText={getDisplayValue.lifeStage}
        setFieldValue={setCurrentLifeStageValue}
        inputFieldRef={lifeStageRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Life stage"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentLifeStageValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lifeStage?.hasError) {
              runValidationTasks("lifeStage", value);
            }
            setCurrentLifeStageValue(value);
          }}
          onBlur={() => runValidationTasks("lifeStage", currentLifeStageValue)}
          errorMessage={errors.lifeStage?.errorMessage}
          hasError={errors.lifeStage?.hasError}
          ref={lifeStageRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lifeStage")}
        >
          <option
            children="Na"
            value="NA"
            {...getOverrideProps(overrides, "lifeStageoption0")}
          ></option>
          <option
            children="Juvenile"
            value="JUVENILE"
            {...getOverrideProps(overrides, "lifeStageoption1")}
          ></option>
          <option
            children="Adult"
            value="ADULT"
            {...getOverrideProps(overrides, "lifeStageoption2")}
          ></option>
          <option
            children="Subadult"
            value="SUBADULT"
            {...getOverrideProps(overrides, "lifeStageoption3")}
          ></option>
          <option
            children="Egg"
            value="EGG"
            {...getOverrideProps(overrides, "lifeStageoption4")}
          ></option>
          <option
            children="Mix"
            value="MIX"
            {...getOverrideProps(overrides, "lifeStageoption5")}
          ></option>
        </SelectField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place,
              type,
              quality,
              lifeStage,
              activity: values,
              characters,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            values = result?.activity ?? values;
          }
          setActivity(values);
          setCurrentActivityValue("");
        }}
        currentFieldValue={currentActivityValue}
        label={"Activity"}
        items={activity}
        hasError={errors?.activity?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("activity", currentActivityValue)
        }
        errorMessage={errors?.activity?.errorMessage}
        setFieldValue={setCurrentActivityValue}
        inputFieldRef={activityRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Activity"
          isRequired={false}
          isReadOnly={false}
          value={currentActivityValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.activity?.hasError) {
              runValidationTasks("activity", value);
            }
            setCurrentActivityValue(value);
          }}
          onBlur={() => runValidationTasks("activity", currentActivityValue)}
          errorMessage={errors.activity?.errorMessage}
          hasError={errors.activity?.hasError}
          ref={activityRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "activity")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place,
              type,
              quality,
              lifeStage,
              activity,
              characters: values,
              behavior,
              observationID,
            };
            const result = onChange(modelFields);
            values = result?.characters ?? values;
          }
          setCharacters(values);
          setCurrentCharactersValue("");
        }}
        currentFieldValue={currentCharactersValue}
        label={"Characters"}
        items={characters}
        hasError={errors?.characters?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("characters", currentCharactersValue)
        }
        errorMessage={errors?.characters?.errorMessage}
        setFieldValue={setCurrentCharactersValue}
        inputFieldRef={charactersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Characters"
          isRequired={false}
          isReadOnly={false}
          value={currentCharactersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.characters?.hasError) {
              runValidationTasks("characters", value);
            }
            setCurrentCharactersValue(value);
          }}
          onBlur={() =>
            runValidationTasks("characters", currentCharactersValue)
          }
          errorMessage={errors.characters?.errorMessage}
          hasError={errors.characters?.hasError}
          ref={charactersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "characters")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place,
              type,
              quality,
              lifeStage,
              activity,
              characters,
              behavior: values,
              observationID,
            };
            const result = onChange(modelFields);
            values = result?.behavior ?? values;
          }
          setBehavior(values);
          setCurrentBehaviorValue("");
        }}
        currentFieldValue={currentBehaviorValue}
        label={"Behavior"}
        items={behavior}
        hasError={errors?.behavior?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("behavior", currentBehaviorValue)
        }
        errorMessage={errors?.behavior?.errorMessage}
        setFieldValue={setCurrentBehaviorValue}
        inputFieldRef={behaviorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Behavior"
          isRequired={false}
          isReadOnly={false}
          value={currentBehaviorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.behavior?.hasError) {
              runValidationTasks("behavior", value);
            }
            setCurrentBehaviorValue(value);
          }}
          onBlur={() => runValidationTasks("behavior", currentBehaviorValue)}
          errorMessage={errors.behavior?.errorMessage}
          hasError={errors.behavior?.hasError}
          ref={behaviorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "behavior")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Observation id"
        isRequired={true}
        isReadOnly={false}
        value={observationID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Image,
              specie,
              Date,
              time,
              place,
              type,
              quality,
              lifeStage,
              activity,
              characters,
              behavior,
              observationID: value,
            };
            const result = onChange(modelFields);
            value = result?.observationID ?? value;
          }
          if (errors.observationID?.hasError) {
            runValidationTasks("observationID", value);
          }
          setObservationID(value);
        }}
        onBlur={() => runValidationTasks("observationID", observationID)}
        errorMessage={errors.observationID?.errorMessage}
        hasError={errors.observationID?.hasError}
        {...getOverrideProps(overrides, "observationID")}
      ></TextField>
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
