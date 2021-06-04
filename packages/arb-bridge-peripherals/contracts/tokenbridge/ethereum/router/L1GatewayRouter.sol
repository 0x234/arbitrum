// SPDX-License-Identifier: Apache-2.0

/*
 * Copyright 2020, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

pragma solidity ^0.6.11;

import "arb-bridge-eth/contracts/libraries/Whitelist.sol";
import "arb-bridge-eth/contracts/bridge/interfaces/IInbox.sol";
import "../../libraries/GatewayRouter.sol";
import "../../arbitrum/router/L2GatewayRouter.sol";

/**
 * @title Handles deposits from Erhereum into Arbitrum. Tokens are routered to their appropriate L1 gateway (Router itself also conforms to the Gateway itnerface).
 * @notice Router also serves as an L1-L2 token address oracle.
 */
contract L1GatewayRouter is WhitelistConsumer, GatewayRouter {
    using Address for address;

    address internal constant ZERO_ADDR = address(0);
    address internal constant BLACKLISTED = address(1);

    address public owner;
    address public defaultGateway;
    address public inbox;

    event TransferRouted(
        address indexed token,
        address indexed _userFrom,
        address indexed _userTo,
        address gateway
    );

    modifier onlyOwner {
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }

    function initialize(
        address _owner,
        address _defaultGateway,
        address _whitelist,
        address _counterpartGateway,
        address _inbox
    ) public virtual {
        GatewayRouter._initialize(_counterpartGateway);
        owner = _owner;
        defaultGateway = _defaultGateway;
        WhitelistConsumer.whitelist = _whitelist;
        inbox = _inbox;
    }

    function setDefaultGateway(address newDefaultGateway) external onlyOwner {
        defaultGateway = newDefaultGateway;
    }

    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "INVALID_OWNER");
        // set newOwner to address(1) to disable owner and keep `initialize` safe
        owner = newOwner;
    }

    function setGateways(
        address[] memory _token,
        address[] memory _gateway,
        uint256 _maxGas,
        uint256 _gasPriceBid,
        uint256 _maxSubmissionCost
    ) external payable onlyOwner returns (uint256) {
        require(_token.length == _gateway.length, "WRONG_LENGTH");

        for (uint256 i = 0; i < _token.length; i++) {
            l1TokenToGateway[_token[i]] = _gateway[i];
            emit GatewaySet(_token[i], _gateway[i]);
        }

        bytes memory data =
            abi.encodeWithSelector(L2GatewayRouter.setGateway.selector, _token, _gateway);

        uint256 seqNum =
            IInbox(inbox).createRetryableTicket{ value: msg.value }(
                counterpartGateway,
                0,
                _maxSubmissionCost,
                msg.sender,
                msg.sender,
                _maxGas,
                _gasPriceBid,
                data
            );
        return seqNum;
    }

    function getGateway(address _token) public view virtual override returns (address gateway) {
        gateway = l1TokenToGateway[_token];
        require(gateway != BLACKLISTED, "BLACKLIST");

        if (gateway == ZERO_ADDR) {
            gateway = defaultGateway;
        }

        require(gateway.isContract(), "NO_GATEWAY_DEPLOYED");

        return gateway;
    }

    function preTransferHook() internal virtual override onlyWhitelisted {
        // will revert if msg.sender is not whitelisted
    }

    function isCounterpartGateway() internal view virtual override returns (bool) {
        // don't expect messages from L2 router
        return false;
    }
}