export const SWIPE_MUTATION = `
  mutation Swipe($swiper_id: uuid!, $swiped_id: uuid!) {
    insert_matches_one(
      object: {
        swiper_id: $swiper_id,
        swiped_id: $swiped_id
      }
    ) {
      id
      is_match
    }
  }
`;
