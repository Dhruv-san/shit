// Queries for fetching profiles and checking matches
export const GET_PROFILES = `
  query GetProfiles($current_user_id: uuid!, $limit: Int!) {
    profiles(
      where: {
        id: { _neq: $current_user_id },
        _not: {
          swipes: {
            swiper_id: { _eq: $current_user_id }
          }
        }
      }
      limit: $limit
    ) {
      id
      name
      bio
      skills
      photo_url
      interests
      expertise
      location
      availability
    }
  }
`;

export const CHECK_MATCH = `
  query CheckMatch($user1_id: uuid!, $user2_id: uuid!) {
    matches(
      where: {
        _and: [
          { swiper_id: { _eq: $user1_id } },
          { swiped_id: { _eq: $user2_id } },
          { direction: { _eq: "right" } }
        ]
      }
    ) {
      id
    }
  }
`;

export const GET_USER_MATCHES = `
  query GetUserMatches($user_id: uuid!) {
    matches(where: {
      _or: [
        { user1_id: { _eq: $user_id } },
        { user2_id: { _eq: $user_id } }
      ]
    }) {
      id
      user1_id
      user2_id
      created_at
      user1 {
        name
        photo_url
      }
      user2 {
        name
        photo_url
      }
    }
  }
`;

export const GET_CHAT_MESSAGES = `
  query GetChatMessages($match_id: uuid!) {
    messages(
      where: { match_id: { _eq: $match_id } }
      order_by: { created_at: asc }
    ) {
      id
      content
      sender_id
      created_at
      sender {
        name
        photo_url
      }
    }
  }
`;

export const SEND_MESSAGE_MUTATION = `
  mutation SendMessage($match_id: uuid!, $sender_id: uuid!, $content: String!) {
    insert_messages_one(object: {
      match_id: $match_id,
      sender_id: $sender_id,
      content: $content
    }) {
      id
      content
      created_at
    }
  }
`;
