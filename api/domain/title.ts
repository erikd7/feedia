import { runQuery, queries } from "../database/postgres";
import { TitleExternalInput } from "../models/title";
import { getDeps } from "../config/deps";

//Upsert to load title information from external data
export const loadTitlesByExternalIds = async (
  titleExternalInput: TitleExternalInput
) => {
  const { dataSources, mediaTypes } = getDeps("dbConstants");
  //Modify input
  const titleInfo = {
    dataSourceId: dataSources[titleExternalInput.dataSource.toUpperCase()],
    externalId: titleExternalInput.externalId,
    mediaTypeId: mediaTypes[titleExternalInput.mediaType.toUpperCase()],
    title: titleExternalInput?.title,
    meta: titleExternalInput?.metadata
  };

  //Retrieve info
  const result = await runQuery(
    queries.insertTitleByExternalId(titleInfo),
    "title",
    true
  );

  return result.title;
};

export const getTitleIdsByExternalIds = async (
  titleExternalInput: Array<TitleExternalInput>
) => {
  const { dataSources, dataSourcesR } = getDeps("dbConstants");
  //Map input
  const externalTitles = titleExternalInput.map(e => ({
    dataSourceId: dataSources[e.dataSource.toUpperCase()],
    externalId: e.externalId
  }));

  //Retrieve info
  const result = await runQuery(
    queries.getTitleIdsByExternalIds(externalTitles),
    "titles"
  );

  //Structure data into map { [dataSource] : { [externalId]: [internalId]}}
  //@ts-ignore
  const titleMap = result.titles.reduce((agg, current) => {
    const dataSource = dataSourcesR[current.dataSourceId.toString()];
    if (!agg[dataSource]) {
      agg[dataSource] = {};
    }
    agg[dataSource][current.externalId] = current.titleId;

    return agg;
  }, {});

  return titleMap;
};
