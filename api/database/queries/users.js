import { pg as SQL } from "yesql";

const queries = {
  getUser: id =>
    SQL(`
    select  id::integer,
            name
    from users
    where id = :id
  `)({ id }),

  getUserWithPreferences: id =>
    SQL(`
    select  id::integer,
            name,
            dob,
            last_lon "lastLon",
            last_lat "lastLat",
            status_id "statusId",
            ethnicity_id "ethnicityId",
            subscription_tier_id "subscriptionTierId",
            karma_score::numeric(3,2) "karmaScore",
            gender_identity_id as "genderIdentityId",
            ul.user_languages "userLanguages",
            us.user_sexualities "userSexualities",
            uiii.user_interested_in_gender "userInterestedInGenderIdentities"
    from users u
    left join (
      select  user_id, json_agg(json_build_object('languageId', language_id,'languageLevelId',language_level_id)) user_languages
      from user_language ul 
      group by user_id	
      ) ul on ul.user_id = u.id
    left join (
      select user_id, array_agg(sexuality_id) user_sexualities
      from user_sexuality us 
      group by user_id 	
      ) us on us.user_id = u.id
    left join (
      select user_id, array_agg(gender_identity_id) user_interested_in_gender
      from user_interested_in_gender uiii 
      group by user_id 	
      ) uiii on uiii.user_id = u.id
    where id = :id
  `)({ id }),

  getUserSubscriptionInfo: userId =>
    SQL(`
    select  u.id::integer,
            st.id::integer "subscriptionTierId",
            st.name "subscriptionTierName"
    from users u
    join subscription_tiers st on u.subscription_tier_id = st.id
    where u.id = :userId
  `)({ userId }),

  setUserSubscriptionTier: (userId, subscriptionTierId) =>
    SQL(`
    update users
    set subscription_tier_id = :subscriptionTierId
    where id = :userId
  `)({ userId, subscriptionTierId }),

  getUserSwipeSubscriptionInfo: userId =>
    SQL(`
    select  u.id::integer,
            st.id::integer "subscriptionTierId",
            st.name "subscriptionTierName",
            usc.window_end "windowEnd",
            usc.remaining_swipes "remainingSwipes"
    from users u
    join subscription_tiers st on u.subscription_tier_id = st.id
    left join user_swipe_cache usc on u.id = usc.user_id
    where u.id = :userId
  `)({ userId }),

  updateUserSwipeCache: ({ userId, windowEnd, remainingSwipes }) =>
    `
    insert into public.user_swipe_cache (user_id, window_end, remaining_swipes)
    values (${userId}, to_timestamp('${windowEnd}', 'Dy, DD Mon YYYY HH24:MI:SS'), ${remainingSwipes})
    on conflict (user_id)
    do update set window_end = to_timestamp('${windowEnd}', 'Dy, DD Mon YYYY HH24:MI:SS'),
    remaining_swipes = ${remainingSwipes};
  `,

  getSubscriptionTiers: () =>
    SQL(`
    select id::integer, name
    from subscription_tiers
  `)(),

  getUserNames: ids =>
    SQL(`
    select  id::integer,
            name
    from users
    where id = ANY(:ids)
  `)({ ids }),

  addUser: ({ name, dob, lastLon, lastLat, statusId }) =>
    SQL(`
    insert into public.users ("name", dob, last_lon, last_lat, status_id)
    values(:name, :dob, :lastLon, :lastLat, :statusId)
    returning id::integer;
  `)({ name, dob, lastLon, lastLat, statusId }),

  deleteUser: userId =>
    SQL(`
    delete from public.users
    where id = :userId;
  `)({ userId }),

  getUserStatuses: () =>
    SQL(`
    select id, name
    from user_statuses
  `)(),

  setStatus: ({ userId, statusId }) =>
    SQL(`
    update users
    set status_id = :statusId
    where id = :userId
  `)({ userId, statusId }),

  getEthnicities: () =>
    SQL(`
    select id, name
    from ethnicities
  `)(),

  setEthnicity: ({ userId, ethnicityId }) =>
    SQL(`
    update users
    set ethnicity_id = :ethnicityId
    where id = :userId
  `)({ userId, ethnicityId }),

  setDob: ({ userId, dob }) =>
    SQL(`
    update users
    set dob = :dob
    where id = :userId
  `)({ userId, dob }),

  setKarmaResponses: ({ userId, ratingUserId, karmaResponses }) =>
    `insert into user_karma_responses (user_id, rating_user_id, question_id, rating) values
      ${karmaResponses
        .map(kr => {
          return `( ${userId}, ${ratingUserId}, ${kr.questionId}, ${kr.rating} )`;
        })
        .join()}
    on conflict (user_id, rating_user_id, question_id) do 
    update set rating = EXCLUDED.rating;`,

  updateOverallKarmaScore: ({ userId }) =>
    SQL(`
      update users
      set karma_score = (
        select ROUND(SUM(rating)::numeric/COUNT(rating), 2) "average"
        from user_karma_responses
        where user_id = :userId
      )
      where id = :userId
    `)({ userId })
};

export default queries;
