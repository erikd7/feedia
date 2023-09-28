import { pg as SQL } from "yesql";

const queries = {
  insertTitleByExternalId: ({
    dataSourceId,
    externalId,
    title,
    mediaTypeId
  }: any) => {
    return SQL(`select insert_title_by_external_id(
      :dataSourceId, :externalId, :title, :mediaTypeId
    ) "titleId"`)({ dataSourceId, externalId, title, mediaTypeId });
  },

  getTitleIdsByExternalIds: (externalTitleData: Array<any>) => {
    return `
    select  title_id "titleId",
            data_source_id "dataSourceId",
            external_id "externalId"
    from title_external_id
    WHERE (data_source_id, external_id) IN
    (${externalTitleData
      .map(t => `(${t.dataSourceId}, '${t.externalId}')`)
      .join(",\n")})
  `;
  }
};

export default queries;
